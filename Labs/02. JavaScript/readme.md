# JavaScript Language

 JavaScript is a cross-platform, object-oriented scripting language. It is a small and lightweight language.

> Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad, having been developed and released in a hurry before it could be refined. (JavaScript: The Good Parts by Douglas Crockford)

## Documentation
 - [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/JavaScript/Guide). Check especially the following topics: 
    - Grammer and types: Declarations, Variable scope;
    - Functions: Defining functions, Calling functions, Closures;
    - Expressions and operators: Comparison operators;
    - Working with objects;
    - Details of the object model.

- [MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

- [W3Schools - JavaScript and HTML DOM Reference](http://www.w3schools.com/jsref/default.asp)

> Missing strongly typed language? Have a look at the Microsoft [TypeScript](https://www.typescriptlang.org/) language that in which the Angular framework is written.

## Assignment
1. Create the HTML page shown in the following figure.

    ![Google Chrome Developer Tools](media/3cdf67cd596f05e7e45dadf13729ca43.png)

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

2. Add a separate CSS file, that includes the CSS rules required for styling the elements in the HTML page.

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

3. In the HTML file add a JavaScript section, starting with the `"use strict";` directive.
    ```JavaScript
    <script type="text/javascript">
    "use strict";

    </script>
    ```
4. Implement the ```addPerson()``` method that will add a new person to the phone agenda.
5. Call the ```addPerson()``` method when the user clicks the "Add Person" button.
6. Move the ```addPerson()``` method to a separte JavaScript file and reference that file in the ```<head>``` section of the page


## Assignment (Try it Yourself)

1. Clear the content of the text inputs after the user presses the "Add Person" button
2. Add the following validation: all the fields should be mandatory
3. Add the following validation: the First Name and the Last Name should have at least two characters
4. Add the following validation: the Phone Number should only contain digits
5. Implement the edit and delete functionalities