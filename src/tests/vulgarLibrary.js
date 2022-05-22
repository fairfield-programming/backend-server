const supertest = require('supertest');
const server = require('../index');
const { JWT_TOKEN } = require('../library/constants');

const requestWithSupertest = supertest(server);
const { detectVulgarWords } = require('../library/VulgarTest');

describe('Test Vulgar Library', () => {
	it('should not trigger for normal sentences', async () => {
		expect(detectVulgarWords('Hey there! My name is William.')).toBe(false);
		expect(detectVulgarWords('Do you guys like pandas? I love them!')).toBe(false);
	});

	it('should trigger when swears are detected', async () => {
		expect(detectVulgarWords('Fuck')).toBe(true);
		expect(detectVulgarWords('Shit')).toBe(true);
	});

	it("shouldn't care about capitalization", async () => {
		expect(detectVulgarWords('FuCK')).toBe(true);
		expect(detectVulgarWords('ShIt')).toBe(true);
	});

	it('should block symbols as well', async () => {
		expect(detectVulgarWords('@ss')).toBe(true);
		expect(detectVulgarWords('@$$')).toBe(true);
	});
});
