export default class ArrayUtils {
	static equals(a1, a2) {
		return Array.isArray(a1) &&
			Array.isArray(a2) &&
			a1.length === a2.length &&
			a1.every((val, index) => val === a2[index]);
	}
}
