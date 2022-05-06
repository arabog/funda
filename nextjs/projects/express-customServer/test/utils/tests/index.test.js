import {
          cutTextToLength,
          slugify,
          composeArticleSlug,
          extractArticleIdFromSlug,
} from '../index'


describe('cutTextToLength', () => {
          test('Should cut a string that exceeds 10 characters', () => {
                    const initialString = 'This is a 34 character long string';

                    const cutResult = cutTextToLength(initialString, 10);

                    expect(cutResult).toEqual('This is a ...')
          });

          test("Should not cut a string if it's shorter than 10 characters", () => {
                    const initialString = 'This i';
                    const cutResult = cutTextToLength(initialString, 10);
                    expect(cutResult).toEqual('This i');
          })
});


describe('slugify makes a string URL-safe', () => {
          test('Should convert a string to URL-safe format', () => {
                    const initialString = 'This is a string to slugify';
                    const slugifiedString =slugify(initialString);
                    expect(slugifiedString).toEqual('this-is-a-string-to-slugify');
          });

          test('Should slugify a string with special characters', () => {
                    const initialString = 'This is a string to slugify!@#$%^&*()+';
                    const slugifiedString = slugify(initialString);
                    expect(slugifiedString).toEqual('this-is-a-string-to-slugify')

          });
})


describe('compose Article Slug', () => {
          test('Should add id to article slug', () => {
                    const id = 'u12w3o0d'; 
                    const title = 'Healthy summer Meloncarrot soup';

                    const articleSlug = composeArticleSlug(id, title);
                    expect(articleSlug).toEqual('healthy-summer-meloncarrot-soup-u12w3o0d')
          });

          test('Should add id to article slug', () => {
                    const id = '987654321'; 
                    const title = 'This is a string to slugify!@#$%^&*()+';

                    const articleSlug = composeArticleSlug(id, title);
                    expect(articleSlug).toEqual('this-is-a-string-to-slugify-987654321')
          });
})


describe('extract ArticleId From Slug', ()=> {
          test('extract Article Id From Slug', () => {
                    const initialString = 'all-about-jellyfish-u16f8o1c';
                    const extractArticleId = extractArticleIdFromSlug(initialString);

                    expect(extractArticleId).toEqual('u16f8o1c');
          });
})
