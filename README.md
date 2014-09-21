Front-Slate
===========

Front end workflow bringing Bootstrap 3, AngularJS, Font Awesome and Mustache all together under one roof for some serious local development. This front end development environment comes with all the tools necessary to build a Bootstrap ready website, using the scalability of Grunt, LESS and Mustache.

Was originally built to develop, test and output static HTML pages using JSON -> Mustache, while at the same time creating resusable Mustache pages and partials that could be past to the backend (e.g. .NET creating C# objects and passing to "N"ustache, resuing same pages and partials) 

Quick Tutorial
--------------
1. Donwload/clone the repo
2. Run npm and bower to get all development dependencies
  1. Command line: `npm install`
  2. Command line: `bower install`
3. Run `grunt build` on the command line (you might have to install GruntJS globally)
4. index.html will be created in the root directory outputting "Hello, World"
5. Lets create a new mustache template and modify the header partial so you can see how it all connects
6. Create new file named articles.mustache inside of the **templates/pages** directory and insert the following code:

        {{=<% %>=}}
        <% > header %>
        
        <div id="main" class="container" role="main">
        	
        	<div class="row">
        		<div class="col-sm-12">
        			<%# Articles %>
        				<article>
        					<h3><% Title %></h3>
        					<p>
        						<%& Content %>
        					</p>
        				</article>
        			<%/ Articles %>		
        		</div>
        	</div>
        	
        </div>
        
        <% > footer %>

**Since Front-Slate by default loads AngularJS we need to change the Mustache directive to `{{=<% %>=}}` so it is easier to distinguish between Mustache and AngularJS**

8. Simple Mustache syntax looping over an **Articles** object, outputting all the articles. But this template/view is useless unless we pass it some data - lets create some JSON
9. Create new file name articles.json inside of the **data/** directory and insert the following data:
 
        {
        	"PageTitle" : "Front-Slate"
        	, "version" : "0.1.0"
        	, "Articles" : [
        		{
        			"Title" : "Article One"
        			, "Content" : "<strong>Lorem ipsum dolor sit amet</strong>, consectetur adipisicing elit. Laborum repellendus obcaecati officia dolorum beatae at aut, consequuntur ducimus odio suscipit esse fugiat, dolorem mollitia repellat vitae quia nobis alias architecto voluptas consectetur vel. Culpa maiores nobis illo laboriosam dolorem fugit reiciendis quasi, accusantium perspiciatis enim eligendi iste nemo repellendus ut."
        		}
        		, {
        			"Title" : "Article Two"
        			, "Content" : "<strong>Lorem ipsum dolor sit amet</strong>, consectetur adipisicing elit. Laborum repellendus obcaecati officia dolorum beatae at aut, consequuntur ducimus odio suscipit esse fugiat, dolorem mollitia repellat vitae quia nobis alias architecto voluptas consectetur vel. Culpa maiores nobis illo laboriosam dolorem fugit reiciendis quasi, accusantium perspiciatis enim eligendi iste nemo repellendus ut."
        		}
        	]
        }

10. Next we have to edit the Gruntfile.js so we can associate the data and the template 
11. Locate the Grunt function called `mustache_render`and added new object to the `files: [` array:

        , {
            data: 'data/articles.json',
            template: 'templates/pages/articles.mustache',
            dest: 'articles.html'
          }
          
12. Learn more about the mustache_render Grunt plugin here: https://www.npmjs.org/package/grunt-mustache-render (Thanks, 5thwall)
13. Now run command line `grunt build`
14. You should now see an articles.html file in the root of the project, open that up in your browser
15. You'll notice in the articles.mustache file we created we are pulling in two partials
  1. `<% > header %>`
  2. `<% > footer %>`
16. For funsies, lets edit the header.mustache file located in **templates/partials/** directory, add the following code inside of the div#main:

        <div class="jumbotron">
          <div class="container">
            <h1>Hello, world</h1>
            <p><% Subheader %></p>
          </div>
        </div>
      	
27. Run command line `grunt build` - open up articles.html in the browser


More documetation in progress...
