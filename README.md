# Password Generator, an API to save time and be more private
This project, simply, is a single API endpoint designed to respond with a configured string as your next social media password. You can simply clone the project, by following:
```bash
git clone https://github.com/ME-ATish/password-Generator.git
```

Then, install the dependencies, and run the project:
```bash
npm install
npm start
```

And get your next perfect password from this endpoint, throughout your own browser:
```http
http://localhost:3006/passgen?len=12
```

## Configuration
Our wonderful project has several options for you, so you should never be worried about *customizing your stupid password*. You can pass the following options as query string to our API endpoint:

* `len` (required): the overall length of supposed password. **The length of the password couldn't be smaller than 8 characters!**
* `uppers` (optional): the count of uppercase letters you want to have in your password.
* `lowers` (optional): the count of lowercase letters in your future password.
* `special` (optional): want some fancy special characters like !, @, #, etc.? Just tell us how many of them will satisfy you.

For instance:
```http
http://localhost:3006/passgen?len=12&uppers=2&lowers=7&special=2
```

## Plans, BTW.
We are going to do a lot of other fancy things, like:

- [ ] making optional things, actually, optional! (they're not, yet:)))
- [ ] adding `numbers` to your phenomenal passwords.
- [ ] including/excluding some characters you would to.
- [ ] adding your supposed salt/pepper to your password.

## Contribution
You have a pull request? Wow, so sweet of you! Send it so we can review it. Otherwise, we're sorry.

## License
No license, hahaha.