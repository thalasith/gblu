# The Gowdie

This project is inspired by a colleague of mine, named Gary Gowdie and such, the logo is of his face.

## Why build this project?

This is an app that is built to solve an internal company problem. We have a lot of legislative updates revolving HR but in many cases, it is very hard to filter through as it comes in a giant unfiltered excel dump.

The goal of this app is to:

1. Build a frontend for internal colleagues to view the updates by country.
2. Build a download to excel of updates by country as this can then be shared externally to clients.
3. Build a pipeline to keep the database updated.

## Technology Stack

This project was bootstrapped with [Create-T3-App](https://create.t3.gg/) which includes all the technology below.

As such, below is a highlight of all the major technologies I used in this project and reasons why.

1. Programming Language: Typescript
   - In my point of view, the coding community is moving towards statically typed languages such as Typescript and Rust. This provides safety in catching bugs to ensure our app is behaving correctly.
   - The entire stack is built on Typescript which is nice so I don't have to go back and forth between different code.
   - Ensures that if another colleague wants to get involved, they just need to learn Typescript and can help with the entire stack.
2. Programming Language: Python
   - Used Python to build a Jupyter notebook for data-cleaning and uploading to the SQL database.
   - Reason why I used Python for this is that many of my colleagues are actuaries and should have some peripheral knowledge of Python. Thus if I could build a Jupyter notebook with some markdown on what the code does, they should be able to use it to update the data as we receive more legislative updates.
3. Database: MySQL (specifically Planetscale)
   - Wanted a relational database in case we need relations in the future (i.e. building out users, and storing previous excel downloads)
   - Not very opinionated on MySQL vs Postgres. I have more experience with MySQL and I liked PlanetScale's UI/UX.
4. Object Relational Mapping: Prisma
   - Type-safe ORM in Typescript
   - Increases my efficiency and ensures consistency in my queries to my database rather than using raw SQL queries.
   - One can argue that using raw SQL queries can increase the app's speed. However, the app is working relatively quick. May remove this all together if future iterations make it too slow.
5. Framework: NextJS
   - Very easy decision for me to go with NextJS.
   - Provides me with a full-stack framework so I do not have to set up a separate server for my backend logic.
   - SSR is also nice for search engine optimization.
6. Frontend: React
   - Very popular front-end library.
   - It is the standard for building apps.
7. CSS: Tailwind
   - Starting to become the standard for CSS as it is highly customizable
   - Is more or less unopinionated vs. MUI or Bootstrap in how you handle your CSS.
8. Hosting: Vercel
   - Free hosting service and easy integration with github.

## Lessons

1. Learnt to deal with ExcelJS to download Excel.
2. Learnt how to data other than JSON from backend to frontend.
3. Learnt how to stream data through arraybuffer.
4. Overall, improved my confidence in being a software engineer.

## Next Steps

Next steps for when I pick this project up again:

1. Write comments on the jupyter notebook for updates for colleagues.
2. Ensure that we are appending data to the database rather than doing a complete rewrite of the data everytime.
3. Potentially restrict access to login only.
4. Provide a way for colleagues to save their download preferences by countries.
5. Review the database to dynamically filter the data further (i.e. provide all updates between July and October only rather than currently which is for all timeline).
