# WebAssembly

## 是什么（What）

WebAssembly（wasm）是一种**低级的二进制指令格式**，运行在栈式虚拟机上。它本身不是编程语言，而是**编译目标**——你用 Rust/C++/Go 等语言写代码，编译成 `.wasm` 二进制文件，再由浏览器引擎或 wasm 运行时加载、验证、编译并执行。

> WebAssembly 是一种跨语言、可移植、默认沙箱化的二进制指令格式，适合承载高性能计算、复用原生库，以及构建安全隔离的插件和运行时扩展。

> wasm 值不值得用，关键不在于它能不能跑，而在于你的瓶颈是不是计算，以及你能不能把跨边界和数据搬运成本控制住。

关键特征：

- **与 JS 协作而非替代**——wasm 不能操作 DOM，需要通过 JS 桥接
- **沙箱执行**——运行在独立的内存空间，不能直接访问宿主环境
- **线性内存模型**——wasm 通常通过线性内存（`WebAssembly.Memory`）和宿主交换复杂数据，JS 可以通过其暴露的 `buffer` 访问这块内存

### 适用边界

| 适合                                       | 不适合                               |
| ------------------------------------------ | ------------------------------------ |
| 计算密集型（图像处理、音视频编解码、加密） | DOM 操作、UI 渲染                    |
| 游戏/3D 渲染的物理引擎                     | 简单的表单逻辑                       |
| 复杂数据处理（解析、压缩、排序）           | 频繁的 JS↔wasm 边界调用（开销大）    |
| 将已有 C/Rust 库移植到 Web                 | 需要大量字符串传递的场景（需编解码） |

## 为什么（Why）

### 为什么存在

wasm 的意义不是简单替代 JS——现代 JS 引擎已经很强大。wasm 提供的是一种更合适的运行模型：在计算密集、可复用原生库、需要受控执行环境等场景，wasm 提供了 JS 难以覆盖的能力。

### 为什么选择

1. **性能**：wasm 由于紧凑的二进制格式、类型信息明确，浏览器支持流式解码和分层编译（baseline + optimizing），在计算密集场景下通常能达到接近原生的执行效率
2. **多语言**：已有 C/Rust 生态可以复用，不必重写
3. **可移植**：不止浏览器，还能跑在服务端（WASI）
4. 安全性：它默认运行在沙箱里，不能直接访问宿主环境。

### 为什么重要

wasm 显著提升了复杂 Web 应用在浏览器中的可行性和性能上限，尤其适合图形、音视频、编辑器这类重计算场景（如 Figma、Photoshop Web、AutoCAD Web）但应用整体的 UI 编排、状态管理和 DOM 交互，通常仍然由 JS/TS 负责。

## 如何做（How）

### 1. 安装工具链

```bash
# 安装 wasm-pack（Rust → WebAssembly 的构建工具）
cargo install wasm-pack
```

### 2. 创建项目

```bash
cargo new --lib wasm-demo
cd wasm-demo
```

### 3. 配置 Cargo.toml

```toml
[package]
name = "wasm-demo"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]      # 生成适合被宿主加载的库产物

[dependencies]
wasm-bindgen = "0.2"         # JS ↔ Rust 的桥接工具
```

### 4. 写 Rust 代码

```rust
// src/lib.rs
use wasm_bindgen::prelude::*;

// 导出函数给 JS 调用
#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

// 也可以从 JS 导入函数来调用
#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}
```

### 5. 编译

```bash
# 编译为 Web 可用模块，输出到 pkg/ 目录
wasm-pack build --target web
```

这会生成 `pkg/` 目录，包含 `.wasm` 文件和自动生成的 JS 胶水代码。

### 6. 在前端使用

```html
<!-- index.html -->
<script type="module">
  import init, { add, greet } from './pkg/wasm_demo.js';

  async function run() {
    await init(); // 加载并实例化 wasm 模块
    console.log(add(2, 3)); // 5
    greet('WebAssembly'); // 弹窗: Hello, WebAssembly!
  }

  run();
</script>
```

放到 Worker 中运行

如果 wasm 处理的是大计算任务，我通常会优先考虑放到 Web Worker 里，而不是直接跑在主线程。

原因很简单：

- 避免阻塞 UI
- 更适合长时间任务
- 和 OffscreenCanvas、图像处理、编解码等场景更搭

### 7. 批量数据处理（高级场景）

当 JS 和 wasm 需要处理大量二进制数据时（如图像像素），常见做法是把数据写入 wasm 线性内存，让 wasm 批量处理，减少跨边界拷贝：

```rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn grayscale(data: &mut [u8]) {
    // 在 wasm 线性内存中批量处理像素数据
    for pixel in data.chunks_exact_mut(4) {
        let gray = (pixel[0] as f32 * 0.3
                   + pixel[1] as f32 * 0.59
                   + pixel[2] as f32 * 0.11) as u8;
        pixel[0] = gray;
        pixel[1] = gray;
        pixel[2] = gray;
        // pixel[3] 是 alpha，保持不变
    }
}
```

JS 端：

```javascript
import init, { grayscale } from './pkg/wasm_demo.js';

await init();
const imgData = ctx.getImageData(0, 0, width, height);
grayscale(imgData.data); // wasm-bindgen 处理数据传递
ctx.putImageData(imgData, 0, 0);
```

> **注意**：wasm-bindgen 会处理 JS typed array 与 wasm 线性内存之间的数据桥接，具体是否有拷贝取决于底层实现，不要简单假设为"零拷贝"。

## 现代演进

wasm 生态在持续扩展，几个重要的新特性：

- **SIMD**：支持向量指令，图像/音视频处理等场景可进一步提速
- **Threads**：通过 `SharedArrayBuffer` 支持多线程，适合并行计算
- **GC**：允许带垃圾回收的语言（如 Kotlin、Dart）直接编译到 wasm，无需自带 GC 运行时
- **Component Model**：定义标准化的组件接口，让不同语言编译的 wasm 模块能互相调用，不再只依赖 JS 做桥接
- **WASI**：WebAssembly System Interface，让 wasm 跑在浏览器之外（服务端、边缘计算、嵌入式），通过能力安全的沙箱访问系统资源

## 参考资料

- [官网](https://webassembly.org/)
- [Rust and WebAssembly](https://rustwasm.github.io/docs/book/)
- [wasm-bindgen 文档](https://rustwasm.github.io/wasm-bindgen/)
