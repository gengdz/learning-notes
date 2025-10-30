import { Fiber, ReactElement } from './constants';

let shouldTrackSideEffects = false;

export default function reconciler(
  current: Fiber,
  workInProgress: Fiber,
  nextChildren: ReactElement,
) {
  shouldTrackSideEffects = current ? true : false;
}
