export function findBestCategory(value, categories) {
	categories = categories.filter(category => category.id !== -1);
	let items = [];
	let valueParts = value.split(" ");
	categories.forEach(category => {
		category.subcategories.forEach(subcategory => {
			let item = getSubcategorySimilarity(valueParts, category, subcategory);
			if (item.similarity > 0) {
				items.push(item);
			}
		});
	});
	items = items.sort((item1, item2) => item2.similarity - item1.similarity);
	items = items.filter((item, index) => index < 5);
	return items;
}


export function getSubcategorySimilarity(valueParts, category, subcategory) {
	let parts = subcategory.split(" ");
	let sim = 0;
	parts.forEach(part => {
		if (part.length > 0) {
			valueParts.forEach(valuePart => {
				let toAdd = similarity(valuePart, part) / Math.max(valuePart.length, part.length);
				if (toAdd >= 0.5) {
					sim += toAdd;
				}
			})
		}
	});
	return {subcategory, similarity: sim, category: category};
}

export function similarity(string1, string2) {
	string1 = string1.toLowerCase();
	string2 = string2.toLowerCase();
	let lcSubstring = longestCommonSubstring(string1, string2);
	if (lcSubstring < 2) {
		lcSubstring = 0;
	}
	return lcSubstring;
}


export function longestCommonSubstring(string1, string2) {
	let length1 = string1.length;
	let length2 = string2.length;
	let dpTable = [];
	for (let i = 0; i < length1; i++) {
		let l = [];
		for (let j = 0; j < length2; j++) {
			l.push(0);
		}
		dpTable.push(l);
	}
	let maxLength = 0;
	for (let i = 0; i < length1; i++) {
		for (let j = 0; j < length2; j++) {
			if (string1.charAt(i) === string2.charAt(j)) {
				if (i === 0 || j === 0) {
					dpTable[i][j] = 1;
				} else {
					dpTable[i][j] = dpTable[i - 1][j - 1] + 1;
				}
				if (dpTable[i][j] >= maxLength) {
					maxLength = dpTable[i][j];
				}
			} else {
				dpTable[i][j] = 0;
			}
		}
	}
	return maxLength;
}


export function longestCommonSubsequence(string1, string2) {
	let length1 = string1.length;
	let length2 = string2.length;
	let dpTable = [];
	for (let i = 0; i <= length1; i++) {
		let l = [];
		for (let j = 0; j <= length2; j++) {
			l.push(0);
		}
		dpTable.push(l);
	}
	for (let i = 0; i <= length1; i++) {
		for (let j = 0; j <= length2; j++) {
			if (i === 0 || j === 0) {
				dpTable[i][j] = 0;
			} else if (string1.charAt(i - 1) === string2.charAt(j - 1)) {
				dpTable[i][j] = dpTable[i - 1][j - 1] + 1;
			} else {
				dpTable[i][j] = Math.max(dpTable[i - 1][j], dpTable[i][j - 1]);
			}
		}
	}
	return dpTable[length1][length2];
}
