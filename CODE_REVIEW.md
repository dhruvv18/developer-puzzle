# Code Review:

## Good:

1. The whole project is structured really well.

## Improvements:

1. Memory leak in book search component since the observable is not unsubscribed, better to use async pipe to get the booklist.
2. Update change detection strategy to OnPush for better performance.
3. The whole app is non responsive, can make it responsive for all the devices.
4. The app does not use SSR, can use SSR to improve FCP(First Contentful Paint).
5. A lot of accessibility issues, eg. focused elements have less contrast and is diffcult to determine what is currently focused especailly on buttons.


## Accessibility
### Lighthouse:
1. Lighthouse shows contrast issue with 'Reading List button' and the <p> tag text in the empty section before making any search.
2. Search button icon doesnt have semantic label for screen readers. 

### My Observation:
1. Low contrast to indicate focused elements, difficult to determine the current focused element.
2. <img> tag were missing alt attribute, for when images dont load.
3. Some form of visual indicates if the button is interactive/clickable on hover/focus.
4. Missing descriptive label for screen readers, for 'Want To Read' button.