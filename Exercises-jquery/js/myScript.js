
$(document).ready(function(){
	//Slide 4
	//1
	//Select all of the div elements that have a class of "module".
	$('div.module');

	//2
	//Come up with three selectors that you could use to get the third item in the #myList unordered list
	$('#myList li')[2];
	$('#myList li').get(2);
	$('#myList li').eq(3);

	//3
	//Select the label for the search input using an attribute selector
	$('label[for=q]');

	//4
	//Count hidden elements on the page (hint: .length)
	$(':hidden').length;
	//this will give me everything in the dom wich includes the head and all elements in it. 
	//Instead, we could do $('body :hidden') which will give us all elements but only those that are inside the body

	//5
	//Count the image elements that have an alt attribute
	$('img[alt]').length;

	//6
	//Select all of the odd table rows in the table body
	$('body table>tbody>tr:odd');

	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	
	//Slide 5
	//1
	/*
	Select all of the image elements on the page
		Log each image's alt attribute
	*/
	$('img').each(function(){
		console.log($(this).attr('alt'));
	});

	//2
	/*
	Select the search input text box, then traverse up to the form and add a class to the form.
	*/
	$('label[for=q]').parent().addClass('justAFormClass');

	//3
	/*
	Select the list item inside #myList that has a class of "current"
		Remove that class from it
		Add a class of "current" to the next list item
	*/
	$('#myList li[class*=current]').removeClass('current').next().addClass('current');

	/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	
	//Slide 6
	//1
	/*
	Select the select element inside #specials
		Traverse your way to the submit button.
	*/
	$('#specials select').parent().next().children('input[type=submit]');

	//2
	/*
	Select the first list item in the #slideshow element
		Add the class "current" to it, and then add a class of "disabled" to its sibling elements
	*/
	$('#slideshow li:first').addClass('current').siblings().each(function(){
		$(this).addClass('disabled');
	});

	/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	
	//Slide 7
	/*
	Add five new list items to the end of the unordered list #myList
	*/
	for(i=0;i<5;i++){
		$('<li/>').html(i+1).appendTo('#myList');
	}

	/*
	Remove the odd list items
	*/
	$('#myList li:odd').remove();

	/*
	Add another h2 and another paragraph to the last div.module
	*/
	$('div.module:last').append('<h2/><p/>');

	/*
	Add another option to the select element
		Give the option the value "Wednesday“
	*/
	$('<option/>').html('Wednesday').appendTo('select');

	/*
	Add a new div.module to the page after the last one
		Put a copy of one of the existing images inside of it
	*/
	$('div.module').parent().append('<div class="module"/>').children(':last').append($('img:first').clone());

	/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
	
});