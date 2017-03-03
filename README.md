
[//]: # (@remove_next_line)

# Coding challenge: Alien dictionary

I occasionally do coding challenges, so I decided to start recording my solutions here (well, at least the successful ones).

I'm definitely not an algorithms guy. My computer science theory is leaky at best. I can usually put together a naive programming-oriented solution, but rarely figure out the mathy trick to do it in a reasonable amount of time.

That said, for this particular challenge, programming solution seems to have been enough.

### The challenge

> There is a new alien language which uses the latin alphabet. However, the order among letters are unknown to you. You receive a list of words from the dictionary, wherewords are sorted lexicographically by the rules of this new language. Derive the order of letters in this language.
> 
> For example,
Given the following words in dictionary,
> 
> ```
> [
> 	"wrt",
> 	"wrf",
> 	"er",
> 	"ett",
> 	"rftt"
> ]
> ```
> 
> The correct order is: `"wertf"`.
> 
> Note:
> 
> You may assume all letters are in lowercase.
> If the order is invalid, return an empty string.
> There may be multiple valid order of letters, return any one of them is fine.

[Original paywalled link](https://leetcode.com/problems/alien-dictionary/)

### Thought process

I figured this can be done in three steps.

#### 1. Extract letter ordering rules

The format is `key: list of letters that come after the key`. For the example word list, you would get something like this:

```javascript
{
	t: ['f'],
	w: ['e'],
	e: ['r'],
	r: ['t']
}
```

So `'t'` comes before `'f'`, `'w'` is before `'e'` and so forth.

#### 2. Using this information, assign weights to each letter

Higher weight means the letter will come later in the sequence. I just go through these rules over and over again and adjust weights, until everything is consistent. Example output for this step:

```javascript
{
	w: 0,
	r: 2,
	t: 3,
	f: 4,
	e: 1
}
```

If any of these weights go over total number of letters, I presume something is wrong and exit.

#### 3. Generate the sequence

In the last step, I just sort the letters using these weights and create a sequence.

### Code

[//]: # (@include_code_file solution.js javascript)

Full code is available here: [solution.js](https://github.com/panta82/alien-dictionary/blob/master/solution.js)

See it in action here: [alien-dictionary](https://panta82.github.io/alien-dictionary/)

