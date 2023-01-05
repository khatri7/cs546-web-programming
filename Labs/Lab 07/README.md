# CS-546 Lab 7: An HTML Document

For this lab, we will create our first 3 HTML files!

This lab is unique in a major way: **there is no node code this week!**

The major concepts of this lab are:

- Making data-centered HTML Documents
  - Thinking in terms of describing our data, without care for the visual aspect
  - Focusing on structure and semantical validity.
- Writing valid HTML
  - (Your HTML must be valid)[https://validator.w3.org/#validate_by_input] or you will lose points on the assignment.
- Linking between pages
  - You will use a basic navigation structure (see below) on each page to link to all the pages you are writing.

## Starting an HTML Document

Your HTML documents should start with the following format. This is a basic, valid, HTML document structure. Your content goes inside of the `body` tags.

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>title</title>
	</head>
	<body>
		<!-- page content -->
	</body>
</html>
```

### Navigation Structure

Each page should include a navigation that links to both other pages

**These links will come in the form of the following setup (this code is not complete; you should describe each page, give the anchors relative file locations, etc!):**

```html
<header>
	<nav>
		<ul>
			<li><a>Page 1</a></li>
			<li><a>Page 2</a></li>
			<li><a>Page 3</a></li>
		</ul>
	</nav>
</header>
```

## About the content

**You are allowed to make up all the content**. If you do not want to give the real information in the HTML documents, feel free to make up the content with an elaborate (or not so elaborate) story.

If you need ideas, I recommend talking about:

- Your life as a dinosaur trainer
- Your time in various schools of witchcraft and wizardry
- A brief story about the time you discovered a dastardly plot where a group of velociraptors were working in the shadows to take over the country of New Zealand.

### index.html

In index.html, you will write a document describing yourself and your likes. In this document you will:

- Include an `h1` tag with your name; for example, I would make mine say `About Patrick Hill`. You should also include a similar description in your `title` tag.
- Create a `main` element with several `article` tags inside of it; each article will have a heading (`h2` level) describing the content inside of it.

Your articles will be:

1. A short, 1-2 paragraph biography about yourself (make sure you use the `p` tag for paragraphs!)
2. An ordered list `ol` of your favorite TV shows, ranked by how much you like each show
3. An unordered list `ul` of your hobbies

### education.html

In education.html, you will write a document describing yourself and your likes. In this document you will:

- Include an `h1` tag describing the page; for example, I would make mine say `My Education`. You should also include a similar description in your `title` tag.
- Create a `main` element with many `section` tags inside of it. Each section will describe a school you have gone to, as well as the following details about that school:

1. The school's name (in an `h2`)
2. Your favorite class in that school (in a `p` tag)
3. A memorable memory from your time in that school (in an `aside` tag)

### story.html

In story.html, you will write a document telling a story that you'd like to share with the world.

- Include an `h1` tag describing the page; for example, I would make mine say `That Time I Overreacted and Bought a Macbook`.
  <br />
  You should also include a similar description in your `title` tag.
- Create a `main` element with the necessary HTML content to tell your story.

For the story, make each paragraph within an actual `p` tag.
