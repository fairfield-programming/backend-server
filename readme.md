<p align="center">
<img width="200" src="https://raw.githubusercontent.com/fairfield-programming/backend-server/d84cd53499177b9069d3a0a72c80701627190c18/.github/media/logo-full.svg">
</p>

# Backend Server

<p align="left">

<img src="https://img.shields.io/github/contributors/fairfield-programming/backend-server" alt="GitHub contributors">
<img src="https://img.shields.io/github/commit-activity/w/fairfield-programming/backend-server" alt="GitHub commit activity">
<img src="https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=blue&up_message=online&url=https%3A%2F%2Ffairfieldprogramming.org" alt="Website">
<img src="https://img.shields.io/github/issues/fairfield-programming/backend-server" alt="GitHub issues">
<img src="https://img.shields.io/github/workflow/status/fairfield-programming/backend-server/Main" alt="GitHub Workflow Status">
<img src="https://img.shields.io/github/stars/fairfield-programming/backend-server" alt="GitHub Org's stars">
<img src="https://img.shields.io/github/languages/top/fairfield-programming/backend-server" alt="GitHub top language">

</p>

## Features

### Duck Generator

We didn't want to use people's faces for the profile pictures. This was for three reasons: we didn't want to pay for hosting the image files, we were scared of what people would upload, and since our main audience is minors, we didn't want their faces to be publicly available. To solve these problems, we decided to use rubber duck avatars instead of photos. Users are able to customize their ducks by adding glasses, hats, items, etc (and they can even set their own colors).

<p align="center">

<img width="100" src="https://fairfield-programming.herokuapp.com/duck/10001000007000053/30" alt="Cool Duck">
<img width="100" src="https://fairfield-programming.herokuapp.com/duck/10102000005000045/30" alt="Red Duck">
<img width="100" src="https://fairfield-programming.herokuapp.com/duck/10603000000000004/30" alt="Blue Duck">
<img width="100" src="https://fairfield-programming.herokuapp.com/duck/10001000000000011/30" alt="Outline Duck">
<img width="100" src="https://fairfield-programming.herokuapp.com/duck/10000000006000012/30" alt="Brown Duck">

</p>

### Authentication Support

We realized early on that there needed to be support for users subscribing to events, email lists, and team features. To do this, we needed the ability for users to create accounts and sign into them. To do this, we added an authentication system that uses many of the strongest security protocols offered today. On top of this security, we built our API to be as strict as possible so that fake accounts cannot be easily created and users with improper credentials cannot mess with accounts.

### Joke API

I was really bored and also thought it would be a nice feature, so I added a joke API. The whole point of it is that you can query it and get a random joke about ducks. I am not really sure why I picked ducks, but I think that there is something cute and pure about them. Did you know ducks mate for life? My dad taught me that, I guess this API is dedicated to him. If you want to query the Duck Joke API, you can use any of the below links.

<p align="center">
<i>Why did the duck go to the chiropractor? To get its back quacked.</i>
</p>

```python
/joke         # gets a random joke
/jokes/count  # gets the amount of jokes the api has
/jokes/random # gets a random joke
/jokes/1      # gets a joke with an id of '1'
/jokes/3      # gets a joke with an id of '3'
```

## Setup
To setup this project, you have to follow these simple steps. The required code to start the project is node.js and npm.

1. Clone the repository by using the github cli, app, or the `git clone https://github.com/fairfield-programming/backend-server` command. 
2. Run the `npm install` command to install all of the dependencies. 
3. Run the `npm start` command to run the server or `npm test` to test the code. 

## Contribute

If you simply star the repo, this helps us out tremendiously. Past that, if you share this repo with your friends, that helps a lot too. If you are feeling super generous, then you can find some issues that you have with the website and try to help us with them.

<p align="center">

<a href="https://github.com/fairfield-programming/backend-server/issues?q=label%3A%22good%20first%20issue%22">
<img alt="GitHub labels" src="https://img.shields.io/github/labels/fairfield-programming/backend-server/good%20first%20issue">
</a>
<a href="https://github.com/fairfield-programming/backend-server/issues?q=label%3A%22help+wanted%22">
<img alt="GitHub labels" src="https://img.shields.io/github/labels/fairfield-programming/backend-server/help%20wanted">
</a>
<a href="https://github.com/fairfield-programming/backend-server/issues?q=label%3A%22bug%22">
<img alt="GitHub labels" src="https://img.shields.io/github/labels/fairfield-programming/backend-server/bug">
</a>
<a href="https://github.com/fairfield-programming/backend-server/issues?q=label%3A%22enhancement%22">
<img alt="GitHub labels" src="https://img.shields.io/github/labels/fairfield-programming/backend-server/enhancement">
</a>

</p>

To start helping, you can click some of the above labels to jump to the pages with issues. Or, you can submit an issue by clicking the last button.
