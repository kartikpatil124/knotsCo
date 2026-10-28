import { useState, useRef, useEffect, type CSSProperties, type ReactNode } from 'react';
import { gsap } from 'gsap';
import './BubbleMenu.css';

export interface MenuItem {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
}

export interface BubbleMenuProps {
  logo?: ReactNode;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
  isOpenControlled?: boolean;
  onCloseControlled?: () => void;
  onItemSelect?: (item: MenuItem) => void;
}

const DEFAULT_ITEMS: MenuItem[] = [
  {
    label: 'home',
    href: '/',
    ariaLabel: 'Return to home',
    rotation: -6,
    hoverStyles: { bgColor: '#294439', textColor: '#ffffff' },
  },
  {
    label: 'shop',
    href: '/shop',
    ariaLabel: 'Shop all blooms',
    rotation: 3,
    hoverStyles: { bgColor: '#294439', textColor: '#ffffff' },
  },
  {
    label: 'categories',
    href: '/categories',
    ariaLabel: 'Browse categories',
    rotation: -5,
    hoverStyles: { bgColor: '#d9aaa3', textColor: '#294439' },
  },
  {
    label: 'story',
    href: '/story',
    ariaLabel: 'Our story',
    rotation: 6,
    hoverStyles: { bgColor: '#a5b5a0', textColor: '#ffffff' },
  },
  {
    label: 'gifting',
    href: '/gifting',
    ariaLabel: 'Gifting studio',
    rotation: -4,
    hoverStyles: { bgColor: '#bd745c', textColor: '#ffffff' },
  },
  {
    label: 'contact',
    href: '/contact',
    ariaLabel: 'Contact us',
    rotation: 5,
    hoverStyles: { bgColor: '#294439', textColor: '#ffffff' },
  },
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = 'Toggle menu',
  menuBg = '#ffffff',
  menuContentColor = '#111111',
  useFixedPosition = true,
  items,
  animationEase = 'back.out(2)',
  animationDuration = 0.48,
  staggerDelay = 0.08,
  isOpenControlled,
  onCloseControlled,
  onItemSelect,
}: BubbleMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isMenuOpen = isOpenControlled !== undefined ? isOpenControlled : internalOpen;
  const [showOverlay, setShowOverlay] = useState(isMenuOpen);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;
  const containerClassName = ['bubble-menu', useFixedPosition ? 'fixed' : 'absolute', className]
    .filter(Boolean)
    .join(' ');

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    if (isOpenControlled === undefined) {
      setInternalOpen(nextState);
    }
    onMenuClick?.(nextState);
    if (!nextState && onCloseControlled) {
      onCloseControlled();
    }
  };

  const handleClose = () => {
    if (isOpenControlled === undefined) {
      setInternalOpen(false);
    }
    onMenuClick?.(false);
    onCloseControlled?.();
  };

  const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, item: MenuItem, index: number) => {
    e.preventDefault();
    const bubble = bubblesRef.current[index];
    if (bubble) {
      gsap.to(bubble, {
        scale: 0.92,
        duration: 0.12,
        ease: 'power2.in',
        onComplete: () => {
          if (onItemSelect) {
            onItemSelect(item);
          }
          handleClose();
        },
      });
    } else {
      if (onItemSelect) {
        onItemSelect(item);
      }
      handleClose();
    }
  };

  // Sync showOverlay when controlled open state flips to true
  useEffect(() => {
    if (isMenuOpen) {
      setShowOverlay(true);
    }
  }, [isMenuOpen]);

  // GSAP animation matching React Bits BubbleMenu with bouncy Gen-Z spring physics
  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);

    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(overlay, { display: 'flex' });
      gsap.killTweensOf([...bubbles, ...labels]);

      bubbles.forEach((bubble, i) => {
        const item = menuItems[i];
        const rot = item?.rotation ?? 0;
        gsap.set(bubble, { scale: 0, y: 35, rotation: rot, transformOrigin: '50% 50%' });
      });
      gsap.set(labels, { y: 20, autoAlpha: 0 });

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.02, 0.02);
        const tl = gsap.timeline({ delay });

        tl.to(bubble, {
          scale: 1,
          y: 0,
          duration: animationDuration,
          ease: animationEase,
        });

        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration * 0.8,
              ease: 'power3.out',
            },
            `-=${animationDuration * 0.8}`
          );
        }
      });
    } else if (showOverlay) {
      document.body.style.overflow = '';
      gsap.killTweensOf([...bubbles, ...labels]);
      gsap.to(labels, {
        y: 18,
        autoAlpha: 0,
        duration: 0.15,
        ease: 'power3.in',
      });
      gsap.to(bubbles, {
        scale: 0,
        y: 25,
        duration: 0.2,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(overlay, { display: 'none' });
          setShowOverlay(false);
        },
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay, menuItems]);

  // Hover micro-animations with spring physics
  const handleMouseEnter = (idx: number) => {
    const bubble = bubblesRef.current[idx];
    if (bubble) {
      gsap.to(bubble, { scale: 1.08, duration: 0.25, ease: 'back.out(2)' });
    }
  };

  const handleMouseLeave = (idx: number) => {
    const bubble = bubblesRef.current[idx];
    if (bubble) {
      gsap.to(bubble, { scale: 1, duration: 0.25, ease: 'power2.out' });
    }
  };

  return (
    <>
      {/* Root Bubble Toggle / Header Nav (if rendered standalone) */}
      {logo !== undefined && (
        <nav className={containerClassName} style={style} aria-label="Main navigation">
          <div className="bubble logo-bubble" aria-label="Logo" style={{ background: menuBg }}>
            <span className="logo-content">
              {typeof logo === 'string' ? <img src={logo} alt="Logo" className="bubble-logo" /> : logo}
            </span>
          </div>

          <button
            type="button"
            className={`bubble toggle-bubble menu-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={handleToggle}
            aria-label={menuAriaLabel}
            aria-pressed={isMenuOpen}
            style={{ background: menuBg }}
          >
            <span className="menu-line" style={{ background: menuContentColor }} />
            <span className="menu-line short" style={{ background: menuContentColor }} />
          </button>
        </nav>
      )}

      {/* Pure Gen-Z Glassmorphism Overlay (Preserves and blurs the underlying page) */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className={`bubble-menu-items ${useFixedPosition ? 'fixed' : 'absolute'}`}
          aria-hidden={!isMenuOpen}
          onClick={handleClose}
        >
          {/* Top Bar with Glassmorphic Logo & Toggle */}
          <div className="bubble-menu-top-bar" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              className="bubble logo-bubble"
              onClick={() => {
                if (onItemSelect) {
                  onItemSelect({ label: 'home', href: '/' });
                }
                handleClose();
              }}
              style={{ background: menuBg }}
              aria-label="Knots N Co home"
            >
              <span className="logo-content flex items-center gap-1.5">
                <span className="text-base">🌸</span>
                <span className="font-sans font-semibold text-charcoal text-xs tracking-tight lowercase">
                  knots n co
                </span>
              </span>
            </button>

            <button
              type="button"
              className="bubble toggle-bubble menu-btn open"
              onClick={handleClose}
              aria-label="Close menu"
              style={{ background: menuBg }}
            >
              <span className="menu-line" style={{ background: menuContentColor }} />
              <span className="menu-line short" style={{ background: menuContentColor }} />
            </button>
          </div>

          {/* 3-on-top, 2-on-bottom Organic Chubby Bubble Cluster */}
          <div className="bubble-cluster-wrapper" onClick={e => e.stopPropagation()}>
            <ul
              className="pill-list"
              role="menu"
              aria-label="Menu links"
            >
              {menuItems.map((item, idx) => (
                <li key={idx} role="none" className={`pill-col pill-col-${idx + 1}`}>
                  <a
                    role="menuitem"
                    href={item.href}
                    onClick={e => handleItemClick(e, item, idx)}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={() => handleMouseLeave(idx)}
                    aria-label={item.ariaLabel || item.label}
                    className="pill-link"
                    style={
                      {
                        '--item-rot': `${item.rotation ?? 0}deg`,
                        '--pill-bg': menuBg,
                        '--pill-color': menuContentColor,
                        '--hover-bg': item.hoverStyles?.bgColor || '#294439',
                        '--hover-color': item.hoverStyles?.textColor || '#ffffff',
                      } as CSSProperties
                    }
                    ref={el => {
                      bubblesRef.current[idx] = el;
                    }}
                  >
                    <span
                      className="pill-label"
                      ref={el => {
                        labelRefs.current[idx] = el;
                      }}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
