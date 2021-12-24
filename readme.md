<p align="center">
<img width="200" src="https://raw.githubusercontent.com/fairfield-programming/backend-server/2d8826df2790798c0c0e8e47ca64c45432d9b5cb/.github/media/logo-full.svg">
</p>

# Backend Server

![Website](https://img.shields.io/website?down_color=lightgrey&down_message=offline&up_color=blue&up_message=online&url=https%3A%2F%2Ffairfieldprogramming.org)
![GitHub issues](https://img.shields.io/github/issues/fairfield-programming/backend-server)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/fairfield-programming/backend-server/Main)
![GitHub Org's stars](https://img.shields.io/github/stars/fairfield-programming)
![GitHub top language](https://img.shields.io/github/languages/top/fairfield-programming/backend-server)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/fairfield-programming/backend-server)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/fairfield-programming/backend-server)
![Lines of code](https://img.shields.io/tokei/lines/github/fairfield-programming/backend-server)

## Features

### Duck Generator

We didn't want to use people's faces for the profile pictures. This was for three reasons: we didn't want to pay for hosting the image files, we were scared of what people would upload, and since our main audience is minors, we didn't want their faces to be publicly available. To solve these problems, we decided to use rubber duck avatars instead of photos. Users are able to customize their ducks by adding glasses, hats, items, etc (and they can even set their own colors).

<p align="center">

<img width="100" src="https://fairfield-programming.herokuapp.com/duck/0103000135/30" alt="Cool Duck">
<img width="100" src="https://fairfield-programming.herokuapp.com/duck/0201000054/30" alt="Red Duck">
<img width="100" src="https://fairfield-programming.herokuapp.com/duck/0300000040/30" alt="Blue Duck">
<img width="100" src="https://fairfield-programming.herokuapp.com/duck/0100000011/30" alt="Outline Duck">
<img width="100" src="https://fairfield-programming.herokuapp.com/duck/0002000021/30" alt="Brown Duck">

</p>

### Authentication Support

We realized early on that there needed to be support for users subscribing to events, email lists, and team features. To do this, we needed the ability for users to create accounts and sign into them. To do this, we added an authentication system that uses many of the strongest security protocols offered today. On top of this security, we built our API to be as strict as possible so that fake accounts cannot be easily created and users with improper credentials cannot mess with accounts.

### Joke API

I was really bored and also thought it would be a nice feature, so I added a joke API. The whole point of it is that you can query it and get a random joke about ducks. I am not really sure why I picked ducks, but I think that there is something cute and pure about them. Did you know ducks mate for life? My dad taught me that, I guess this API is dedicated to him. If you want to query the Duck Joke API, you can use any of the below links.

```python
/joke         # gets a random joke
/jokes/count  # gets the amount of jokes the api has
/jokes/random # gets a random joke
/jokes/1      # gets a joke with an id of '1'
/jokes/3      # gets a joke with an id of '3'
```
