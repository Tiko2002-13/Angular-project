import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

// Page fade-in animation
export const fadeInAnimation = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('800ms ease-in', style({ opacity: 1 }))
  ])
]);

// Page slide up animation
export const slideUpAnimation = trigger('slideUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(30px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

// Stagger animation for lists
export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(100, [
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]);

// Button press animation
export const buttonPressAnimation = trigger('buttonPress', [
  transition('* => pressed', [
    animate('100ms ease-in', style({ transform: 'scale(0.95)' })),
    animate('100ms ease-out', style({ transform: 'scale(1)' }))
  ])
]);

// Card hover animation
export const cardHoverAnimation = trigger('cardHover', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.95)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
  ]),
  transition(':leave', [
    animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
  ])
]);

// Route transition animation
export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        opacity: 0
      })
    ], { optional: true }),
    query(':enter', [
      animate('600ms ease-in', style({ opacity: 1 }))
    ], { optional: true })
  ])
]);

// Fade scale animation
export const fadeScaleAnimation = trigger('fadeScale', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate('500ms cubic-bezier(0.35, 0, 0.25, 1)', 
      style({ opacity: 1, transform: 'scale(1)' }))
  ])
]);

// Slide in from left
export const slideInLeftAnimation = trigger('slideInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-50px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

// Slide in from right
export const slideInRightAnimation = trigger('slideInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(50px)' }),
    animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

