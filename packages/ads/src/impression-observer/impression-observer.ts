import { ImpressionObserverParams } from './impression-observer.interface';

const INTERSECTION_THRESHOLD = 0.5;
const INTERSECTION_TIMER = 1000;

export class ImpressionObserver {
  static IMPRESSION_EVENT = 'impression';
  private filter?: (element: Element) => boolean;
  private once?: boolean;
  private iObserver?: IntersectionObserver;
  private mObserver?: MutationObserver;
  private intersectionTimer?: ReturnType<typeof setTimeout>;

  private isIntersected: boolean = false;
  private isMutated: boolean = false;

  constructor({ filter, once }: ImpressionObserverParams = {}) {
    this.filter = filter;
    this.once = once;
  }

  private checkFilter(element: Element) {
    return (this.filter && this.filter(element)) || !this.filter;
  }

  private onIntersection(callback: () => void) {
    this.iObserver?.disconnect();
    this.isIntersected = true;

    if (this.isMutated && this.isIntersected) {
      callback();
    }
  }

  private onMutation(callback: () => void) {
    this.mObserver?.disconnect();
    this.isMutated = true;

    if (this.isMutated && this.isIntersected) {
      callback();
    }
  }

  private observeWithIntersectionObserver(
    element: Element,
    callback: (element: Element) => void
  ) {
    this.iObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.intersectionTimer = setTimeout(
              () => this.onIntersection(() => callback(element)),
              INTERSECTION_TIMER
            );
          } else {
            clearTimeout(this.intersectionTimer);
            this.isIntersected = false;
          }
        }),
      { threshold: INTERSECTION_THRESHOLD }
    );
    this.iObserver.observe(element);

    if (this.filter) {
      this.mObserver = new MutationObserver(() => {
        if (this.checkFilter(element)) {
          this.onMutation(() => callback(element));
        }
      });
      this.mObserver.observe(element, { attributes: true });
    } else {
      this.onMutation(() => callback(element));
    }
  }

  public observe(element: Element) {
    return this.observeWithIntersectionObserver(element, (element: Element) => {
      element.dispatchEvent(
        new CustomEvent(ImpressionObserver.IMPRESSION_EVENT, {
          bubbles: true,
        })
      );
      if (this.once) {
        this.disconnect();
      }
    });
  }

  public disconnect() {
    this.iObserver?.disconnect();
    this.mObserver?.disconnect();
  }

  public addImpressionListener(
    element: Element,
    listener: (event: Event) => void
  ) {
    element.addEventListener(ImpressionObserver.IMPRESSION_EVENT, listener);
  }
}
