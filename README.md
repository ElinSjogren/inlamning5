This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
-----------------
Improvments and benefits:
A search box on the start page with lazy-load not to slow down the speed. User can now search and get exactly what event they want and see with the important dates directly.
More interactive event list with help from spotify. Now user can pre-listen to the artist if the event could be intresting for them.
Added a better date-picker for "Add Events". Also added a contries-list for easy access to choose which country the event will be in. Added media Social for advertise the event if the user wants to do that.

Accessibility:
Add event-page have an much more user friendly and accessible calender for picking dates. You can easely tab, use arrows and press enter and there is no need for curser.
Semantic HTML elements for more accessibility and ARIA.

Technical:
We used the lazy & suspense on search on first page. Maybe not the most effective but we had to use it somewhere. 
Lazy is also used for artist pictures on "Show events" with next/image (dynamic) with lazy loading.
Date-picker is used for a better calender for the user.
Also used a countries npm import for dropdown for countries for adding an event.
Aria-labels is used in the few places we have input fields I guess sums it up.
Semantic HTML is kinda used, not everywhere but "Tab" works great with everything on the page.

Overall:
A huge challenge was to search for improvments as we go. And of course bugs in the process. Late in the project we found out that out teammate could not help us with his part. There is no hard feelings but there are still som improvments yet to be done. For example more aria tags implementation and refactoring of the code, split the rendering code from the more logical code that is more of technical code. Could improve the input fields to only accept the correct string/number and not some damaging code also. We could have done better of course but we feel we are satisfied with this and the design of the page. We are happy we got all things to work in the end (hopefully).

/Elin & Andreas 






