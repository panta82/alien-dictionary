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

```javascript
function order(words) {
	const rules = {};
	const weights = {};
	
	// 1. Extract ordering rules from input words
	wordLoop:
	for (let row = 0; row < words.length - 1; row++) {
		const thisWord = words[row];
		const nextWord = words[row + 1];

		let col = 0, before, after;
		do {
			before = thisWord[col];
			after = nextWord[col];
			col++;

			if (!before || !after)  {
				continue wordLoop;
			}
		} while (before === after);

		if (rules[after] && rules[after].indexOf(before) !== -1) {
			// Invalid input. Conflicting rule
			return '';
		}

		// Prefill weights
		weights[before] = 0;
		weights[after] = 0;

		const afterList = rules[before] = rules[before] || [];
		if (afterList.indexOf(after) ===  -1) {
			afterList.push(after);
		}
	}

	// 2. Resolve weights
	let changed;
	const alphabetLength = Object.keys(weights).length;
	do {
		changed = false;
		ruleLoop:
		for (let before in rules) {
			const afterList = rules[before];
			for (let i = 0; i < afterList.length; i++) {
				const after = afterList[i];
				if (weights[after] <= weights[before]) {
					weights[after] = weights[before] + 1;

					// Check if infinite loop:
					// I will assume in a solvable alphabet the highest index will never
					// be greater than total number of letters
					if (weights[after] > alphabetLength) {
						return '';
					}

					changed = true;
					break ruleLoop;
				}
			}
		}
	} while (changed);

	// 3. Order results according to weights
	const result = Object.keys(weights);
	result.sort((a, b) => {
		return weights[a] - weights[b];
	});

	return result.join('');
}
```
