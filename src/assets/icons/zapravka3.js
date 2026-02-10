import * as React from "react"
import Svg, { Rect, Defs, Pattern, Use, Image } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      {...props}
    >
      <Rect width={32} height={32} rx={8} fill="url(#pattern0_153_20658)" />
      <Defs>
        <Pattern
          id="pattern0_153_20658"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <Use xlinkHref="#image0_153_20658" transform="scale(.00833)" />
        </Pattern>
        <Image
          id="image0_153_20658"
          width={120}
          height={120}
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAACXBIWXMAACE4AAAhOAFFljFgAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALsSURBVHgB7dztbdpQFMbxY8MA7QZB6gAdwRuUDZpI/d52gioblM+tBExQssHdoAyAREZggZj6lqAaY8Bv97mq9P9JIdg4yodH52IfHzADAAAAAAAAAAAAAAAAAAAAgP9bYio/N1MbjX4ZlNapqYxGHw1qM00Fz7d3xePWoDYRVfBLZlBz9jB5FgXM8hzB0j+ED/iwPGcGpV3xs/JPwgec271BbVUszz5kQcCpsTzrLY9Pwgb8Y5sVj3cGpeeiet1xI2zAY6o3AlfeCL1EZwa1x/JGuIDnm3tjeVZb+2vf8o6AFTz6YFCbVXeECfhw7Ts1qLnqjkAVTGsyAlddnr1AAdOajGBZt3P4u0ncOYphV1Tv27oXhq/gff7FoLa69MLYhpbs15bnjwadNF0YAAAAAAAYoFXpW5M5Nxek9kVr8tO7VZND+3eyfGsyHX02KC3sSnuyrH8vOkm5sa+3bHpgv4CZmozhZGryln4BMzWpt8+f2hzed4lmLEctSb+3Obx7wIepyTcGpdqxnGt6VDBjORE0Prk66hYwnxiMxVlLHSuYxobcfv/Udnn2OgZMY0MuSRo1Ns7+zNpiajIGf+07sQ66VPA3g5qzjroEnBnUWp89H7ULmNZkDK1ak1XtAqY1qZfnnavXax7wfOu7VrQm1XoOtbeo4BcfLq1JLdfl2resRcC0JiPotTx7bSY6HgxqOwMAAAAAAI1dvuE/30yZ3JDz3zX51QZ0pZP1N9zMoNS7NVlV34tmajIWZwO7cLOBqUm5jlOTt1wImPdeuSRZWADnJ1lMTcbQeWrylroKZmpSz1kgdQFnBrXBz56PTgNmajKGXlOTt5wGzNSkXs+pyVuqSzRTk2qBvwr4X8B8oDsGF+Lat6xUwUxNRhB0efYOAdOajMVZYK8VTGtSLlBrsuo1YFqTcoFak2f/plie3xe/fxuUgrUmq3wFU716zkTGxXtBUiwXzqA0MwAAAAAAAAAAAAAAAAAAAAj9AWuLnGEqrmzwAAAAAElFTkSuQmCC"
        />
      </Defs>
    </Svg>
  )
}

export default SvgComponent
