# Node server for Foody
ExpressJS endpoints for Foody App

## What is Foody?
Foody utlizes Open AIs assistent API to creatre a customize AI nutritionalist and a chef that can provide meal ideas given a set of ingredients. Foody will provide nutritions and macros of a meal.
User can also create their own profile with their weight goals in mind while tracking their food calories and macros to hit their ideal weight.

## Why?
I often have ingredients and leftover in my fridge. I was tired of coming up with random meal ideas with these leftover items. 

I like to be healthy and I often count my daily calorie intake. There are many calorie trackers out there and most of them have features behind a paid wall while others doesnt provide meal ideas. Foody has both!

Combine both those ideas, we get Foody!
This was an amazing oppurtinity to utilize the populatirty of AI to create your own customized assistant based on your needs. This was also an good oppurtinity for me to start a fresh project from scratch while introducing a proper fullstack architecture.

## Requirements
* node v16+
* npm v8+
* mongodb v5+
* mongoose v7+
* openai v4.17+
* gcp v7+
* postman 

## Getting started
```
npm i
npm run dev
```

Set up `.env `. Use `.env.example` as a reference

## Lint
None at the moment but the plan is to use husky in CI/CD pipeline

## Swagger Doc
This repo utilizes swagger-autogen and ts-json-schema-generator to automatically generate a swagger doc
```
# generate swagger.json
npm run swagger-autogen
```

View API documentation by
`localhost:3000/api-docs`

## Related Repo
[Foody Frontend](https://github.com/achen5671/foody-ai)

