# Multiple Elements Cycle Plugin

Provides a simple preview scrolling panel of list items. Shows the given range of li items from the middle (hiding the edges items) and allows scrolling left and right within the list. Does not handle automatic scrolling or wrapping items around.

## Install

See demo/index.html for examples. 

You only need to include 2 javascript files in your project. jQuery and the Multiple Elements Cycle.

	<script src="../vendor/jquery-1.4.2.min.js">
	<script src="../jquery.multipleelements.cycle.js">
	
You should not link to styles.css completely, instead include at least the following lines in your own css

	.cycleElementsContainer li {
		display: block;
		width: 100px; /* height or width is required depending on vertical or horizontal orientation */
		height: 80px;
		float: left;
	}
	
### Configuration

Options which you can configure the plugin with $("#scoller").multipleElementsCycle(options); where options is an javascript object made up
of the following options.
	
<table>
	<thead>
		<tr>
			<th>Option</th>
			<th>Description</th>
			<th>Type</th>
			<th>Default Value</th>
		</tr>
	</thead>
	
	<tbody>
		<tr>
			<td>container</td>
			<td>Defines the container element which holds the list container.</td>
			<td>Selector String (eg div#id, div.class)</td>
			<td>#cycleElements</td>
		</tr>
		
		<tr>
			<td>prev</td>
			<td>Defines the selector which scrolls the list to the previous item.</td>
			<td>Selector String (eg #id, .class)</td>
			<td>#cycleElementsLeft</td>
		</tr>
		
		<tr>
			<td>next</td>
			<td>Define the selector which scrolls the list to the next item</td>
			<td>Selector String (eg #id, .class)</td>
			<td>#cycleElementsRight</td>
		</tr>
		
		<tr>
			<td>speed</td>
			<td>Animate speed of the scrolling</td>
			<td>Integer (milliseconds)</td>
			<td>500</td>
		</tr>
		
		<tr>
			<td>containerSize</td>
			<td>Sets a custom size for the container of the scroller to sit in</td>
			<td>Integer (pixels)</td>
			<td>false</td>
		</tr>
		
		<tr>
			<td>showCount</td>
			<td>The number of list items to show in the scroller</td>
			<td>Integer</td>
			<td>4</td>
		</tr>
		
		<tr>
			<td>start</td>
			<td>Override the start value (normally centered) with a given start index</td>
			<td>Integer</td>
			<td>false</td>
		</tr>
		
		<tr>
			<td>jumpTo</td>
			<td>Selector to use as a jump to. Should have a data-position="" attribute. See the #jumpToDemo in the demo/index.html</td>
			<td>Selector String (eg #id, .class)</td>
			<td>false</td>
		</tr>
		
		<tr>
			<td>vertical</td>
			<td>Define this scrolling list as vertical rather than side to side</td>
			<td>Boolean</td>
			<td>false</td>
		</tr>
		
		<tr>
			<td>scrollCount</td>
			<td>Number of elements to scroll on each click. If this is out of bounds it will take the scroll the remaining items</td>
			<td>Integer</td>
			<td>1</td>
		</tr>
		
		<tr>
			<td>element</td>
			<td>Element which is used as the scrollable container</td>
			<td>Selector (eg li, div.class)</td>
			<td>li</td>
		</tr>
		
		<tr>
			<td>parent</td>
			<td>Selector which is the parent of the elements in the scrollable container</td>
			<td>Selector (eg ul, div.class)</td>
			<td>ul</td>
		</tr>
	</tbody>
</table>

## License

This plugin is released under the revised BSD. See LICENSE.