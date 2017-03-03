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