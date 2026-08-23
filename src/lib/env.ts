/* Is this build a private review copy rather than the live site?

   Set `NOINDEX=1` in the Hostinger dashboard on the preview app, and leave it
   unset on production. It has to be present at BUILD time, not just at runtime:
   robots.txt and every page's metadata are generated during the build, so a
   variable added afterwards would not reach them.

   Why it matters: a review copy that Google finds is a second site competing
   with the real one for the same words, and the duplicate can outrank the
   original. Cleaning that up later costs far more than setting one variable
   now. */
export const isPreview = process.env.NOINDEX === "1";
