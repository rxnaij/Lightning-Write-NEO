/**
 * Constrains a value between a minimum and maximum value.
 *
 * @method constrain
 * @param  {Number} n    number to constrain
 * @param  {Number} low  minimum limit
 * @param  {Number} high maximum limit
 * @return {Number}      constrained number
 * @example
 * <div><code>
 * function draw() {
 *   background(200);
 *
 *   let leftWall = 25;
 *   let rightWall = 75;
 *
 *   // xm is just the mouseX, while
 *   // xc is the mouseX, but constrained
 *   // between the leftWall and rightWall!
 *   let xm = mouseX;
 *   let xc = constrain(mouseX, leftWall, rightWall);
 *
 *   // Draw the walls.
 *   stroke(150);
 *   line(leftWall, 0, leftWall, height);
 *   line(rightWall, 0, rightWall, height);
 *
 *   // Draw xm and xc as circles.
 *   noStroke();
 *   fill(150);
 *   ellipse(xm, 33, 9, 9); // Not Constrained
 *   fill(0);
 *   ellipse(xc, 66, 9, 9); // Constrained
 * }
 * </code></div>
 *
 * @alt
 * 2 vertical lines. 2 ellipses move with mouse X 1 does not move passed lines
 */
function constrain (n, low, high) {
    return Math.max(Math.min(n, high), low);
  };

/**
 * Re-maps a number from one range to another.
 *
 * In the first example above, the number 25 is converted from a value in the
 * range of 0 to 100 into a value that ranges from the left edge of the
 * window (0) to the right edge (width).
 *
 * @method map
 * @param  {Number} value  the incoming value to be converted
 * @param  {Number} start1 lower bound of the value's current range
 * @param  {Number} stop1  upper bound of the value's current range
 * @param  {Number} start2 lower bound of the value's target range
 * @param  {Number} stop2  upper bound of the value's target range
 * @param  {Boolean} [withinBounds] constrain the value to the newly mapped range
 * @return {Number}        remapped number
 * @example
 *   <div><code>
 * let value = 25;
 * let m = map(value, 0, 100, 0, width);
 * ellipse(m, 50, 10, 10);
</code></div>
 *
 *   <div><code>
 * function setup() {
 *   noStroke();
 * }
 *
 * function draw() {
 *   background(204);
 *   let x1 = map(mouseX, 0, width, 25, 75);
 *   ellipse(x1, 25, 25, 25);
 *   //This ellipse is constrained to the 0-100 range
 *   //after setting withinBounds to true
 *   let x2 = map(mouseX, 0, width, 0, 100, true);
 *   ellipse(x2, 75, 25, 25);
 * }
</code></div>
 *
 * @alt
 * 10 by 10 white ellipse with in mid left canvas
 * 2 25 by 25 white ellipses move with mouse x. Bottom has more range from X
 */
export function mapValues (n, start1, stop1, start2, stop2, withinBounds) {
    
    const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    console.log("newval: " + newval)
    if (!withinBounds) {
      return newval;
    }
    if (start2 < stop2) {
      return constrain(newval, start2, stop2);
    } else {
      return constrain(newval, stop2, start2);
    }
  };