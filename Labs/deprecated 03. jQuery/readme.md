# jQuery Library

jQuery is a fast, small, and feature-rich JavaScript library. It makes it easy to find the elements of a document, and then manipulate those elements by adding content, editing HTML attributes and CSS properties, defining event handlers, and performing animations. It also has Ajax utilities for dynamically making HTTP requests, and general-purpose utility functions for working with objects and arrays.

Why should we use it?
-   hides differences and incompatibilities in the various browsers;
-   simplifies common tasks.

Features:
-   An expressive syntax (CSS selectors) for referring to elements in the document
-   An efficient query method for finding the set of document elements that match a CSS selector 
-   A useful set of methods for manipulating selected elements
-   Powerful functional programming techniques for operating on sets of elements     as a group, rather than one at a time
-   A succinct idiom (method chaining) for expressing sequences of operations

Note:
- it defines a single global function named ```jQuery()``` with the shortcut ```$()```
- so it only adds 2 variables to the global namespace:  ```jQuery``` and ```$()```

```JavaScript
$("p").css("background-color", "green").show("slow");
```
```HTML
<!DOCTYPE html>
<html>
    <head>
        <script 
            src="https://code.jquery.com/jquery-latest.js"
            crossorigin="anonymous"></script>
    </head>
    <body>
        <p style="display: none">Hello jQuery World!</p>
    </body>
</html>
```

Overloads:
-   jQuery(css selector)
-   jQuery(dom element)
-   jQuery(html string)
-   jQuery(function)

## Documentation
-   <http://jquery.com>
-   <http://api.jquery.com/>

## Assignment
1. Download the jQuery library from jquery.com (both compressed and uncompressed)
2. Check the difference file size difference between the two versions
3. Open the uncompressed version and try to figure out why we can use both ```jQuery()``` and ```$()```
4. Create a new HTML page and add the code included bellow.
     ```HTML
    <!DOCTYPE html>
    <html>
        <head>
            <title>Telephone Agenda</title>
            <link rel="stylesheet" type="text/css" href="agenda-JavaScript.css">
        </head>
        <body>
            <h1>Telephone Agenda</h1>
            <table>
                <caption>
                    Person List
                </caption>
                <thead>
                    <tr>
                        <th>Last Name</th>
                        <th>First Name</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    <tr>
                        <td>Popescu</td>
                        <td>Ion</td>
                        <td>023423222</td>
                    </tr>
                    <tr>
                        <td>Vasilescu</td>
                        <td>Maria</td>
                        <td>073423222</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">Number of persons: 2</td>
                    </tr>
                </tfoot>
            </table>
            <form action="#" class="controls">
                <label for="lastName">Last Name:</label>
                <input name="lastName" id="lastName">
                <label for="firstName">First Name:</label>
                <input name="firstName" id="firstName">
                <label for="phone">Phone Number:</label>
                <input name="phone" id="phone">
                <input type="button" value="Add Person">
            </form>
        </body>
    </html>
    ```

5. Add a separate CSS file, that includes the CSS rules required for styling the elements in the HTML page.

    ```CSS
    body
    {
        font-family: tahoma;
        font-size: 11pt;
        line-height: 1.2em;
        margin: 0;
        padding: 12px;
    }

    h1
    {
        background-color: Navy;
        color: White;
        
        margin: 0;
        padding: 16px;
        margin: -12px -12px 20px -12px;
    }

    table
    {
        border: 1px solid Gray;
        border-collapse: collapse;
        
        text-align: left;
        
        width: 60%;
        float: left;
    }

    td, th
    {
        padding: 8px 12px;
        border-bottom: 1px solid Gray;
    }

    th
    {
        background-color: #EEEEEE;
    }


    caption
    {
        padding: 8px 12px;
        border: 1px solid Gray;
        border-bottom: none;
        background-color: #E0E0E0;
        
        font-weight: bold;
    }

    tfoot
    {
        background-color: #EEEEEE;
        font-weight: bold;	
    }


    form
    {
        border: 1px solid Gray;
        border-radius: 5px;
        
        background-color: #EEEEEE;
        
        padding: 16px;	
        
        float: right;	
        width: 30%;	
    }

    label
    {
        display: block;
        float: left;
        clear: both;
        
        width: 35%;
    }

    input
    {
        font-size: 11pt;
        display: block;
        float: right;	
        width: 60%;
    }

    input[type="button"]
    {
        font-weight: bold;	
        padding: 5px;
    }
    ```
6. In the ```<head>``` section of the page add a reference to the uncompressed version of the jQuery library
    ```HTML
       <script src="***">
    ```
7. In the ```<head>``` section of the page add a JavaScript section, starting with the `"use strict";` directive.
    ```HTML
    <script type="text/javascript">
    "use strict";

    </script>
    ```
8. Implement the ```addPerson()``` method that will add a new person to the phone agenda.
    > Check <http://api.jquery.com/> if you need more information regarding the functions we will be using.
9. Use the jQuery ```click()``` method in order to bind the ```addPerson()``` as an event handler to the "click" event of the the "Add Person" button
10. Use the jQuery ```ready()``` method in order to specify a function that will be executed when the DOM is fully loaded.
11. Move the JavaScript code that you have written so far to a separate *.js file and reference that file in the ```<head>``` section of the page.

## Assignment (Try it Yourself)

1. Clear the content of the text inputs after the user presses the "Add Person" button
    > Hint: Use the val() method
2. Add the following validation: all the fields should be mandatory
    > Note: HTML5 supports the required attribute
3. Add the following validation: the First Name and the Last Name should have at least two characters
4. Add the following validation: the Phone Number should only contain digits
    > Hint: Read about the javascript [test()](https://www.w3schools.com/jsref/jsref_regexp_test.asp) method. Use a regular expression such as ```/^\d+$/``. Check online what the previous regex means. ;)
5. Check the jQuery Validation library (https://jqueryvalidation.org/documentation/). Use it in order to validate the input fields in the developed app.
    > Note: The plugin is quite popular, beeing also used by the Microsoft ASP.NET MVC framework.
6. Use an array to store the agenda. Display the phone agenda by iteracting over the arrat.
    > Hint: var personList = [];
7. Implement the edit and delete functionalities.
    > Hint: The jQuery ```data()```(https://api.jquery.com/jquery.data/) method might prove really useful.