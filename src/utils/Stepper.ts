export default class Stepper {
  onNext?: () => void;

  onPrev?: () => void;

  setListener(onNext: () => void, onPrev: () => void) {
    this.onNext = onNext;
    this.onPrev = onPrev;
  }

  next() {
    this.onNext?.();
  }

  prev() {
    this.onPrev?.();
  }
}
