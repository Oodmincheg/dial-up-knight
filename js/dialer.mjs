export default {
	reachableKeys,
	countPaths,
	listAcyclicPaths
};

const dialPad = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[null,0,null]
];

const dialPadMap = {
	1: [6,8],
	2: [7,9],
	3: [4,8],
	4: [3,9,0],
	5: [],
	6: [1,7,0],
	7: [2,6],
	8: [1, 3],
	9: [4, 2],
	0: [4, 6]
}
// ****************************

function reachableKeys(startingDigit) {

	return dialPadMap[startingDigit];
}

function countPaths(startingDigit,hopCount) {
	// TODO: given the digit/key to start from and
	// the number of hops to take, return a count
	// of all the possible paths that could be
	// traversed
	if(hopCount === 0) {
		return 1;
	}
	let reachable = reachableKeys(startingDigit);
	if(!reachable || reachable.length === 0) {
		return 0;
	}
	let count = 0;
	for(let i = 0; i < reachable.length; i++) {
		count += countPaths(reachable[i], hopCount - 1);
	}
	return count;
}

console.log(countPaths(3, 5))

function listAcyclicPaths(startingDigit) {
	// path = []
	// push startingDigit to path
	// for each reachable key
	// 	push reachable key to path
	// if key in path already then return path
	function findUniquePath(startingDigit, path) {
		let reachable = reachableKeys(startingDigit);
		if(!reachable || reachable.length === 0) {
			return [];
		}
		for(let i = 0; i < reachable.length; i++) {
			let key = reachable[i];
			if(path.includes(key)) {
				return path;
			}
			path.push(key);
			return findUniquePath(key, path);
		}
	}
	let path = [startingDigit];
	let paths = [];
	for(let i = 0; i < dialPad.length; i++) {
		let row = dialPad[i];
		for(let j = 0; j < row.length; j++) {
			let key = row[j];
			if(key !== null) {
				path = [key];
				let uniquePath = findUniquePath(key, path);
				if(uniquePath.length > 0) {
					paths.push(uniquePath);
				}
			}
		}
	}
	return paths
}

console.log(listAcyclicPaths(1))
