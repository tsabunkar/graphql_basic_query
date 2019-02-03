import {
    GraphQLServer
} from 'graphql-yoga';



// ! Type definations -> is also called application schema, (here we define our custome data-type, All of the 
// ! operations that can be perfomed on the API, We can also define how our data-type looks like)

// Scalar types (builtin data-type) -> String, Boolean, Int, Float, ID
// User-> Custom/User defined data-type (Non-Scalar data-type)

const typeDefs = `
    type Query {
        hello: String!
        name: String!
        location: String!
        bio: String!
        id: ID!
        personAge: Int!
        isEmployeed: Boolean!
        salary: Float
        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean!
        me: User!
        post: Post!
        greeting(name: String): String!
        add(a: Float!, b: Float!): Float
        grades: [Int!]!
        addMe(numbers: [Float!]!): Float!
        users: [User!]!
        searchUsers(queryFor: String): [User!]!
        posts(searchFor: String): [Post!]!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`;


// ! Resolvers -> Application is resolvers are set of functions
const resolvers = {
    Query: { // Create only one method for one query
        hello() {
            return 'This is my first GraphQL query'
        },
        name() {
            return 'My Name is Tejas Shailesh Sabunkar'
        },
        location() {
            return 'Bangalore'
        },
        bio() {
            return 'I am a software developer in Mindtree!!'
        },
        id() {
            return Math.random().toString();
        },
        personAge() {
            return 24;
        },
        isEmployeed() {
            return true;
        },
        salary() {
            // return 300000.57
            return null
        },

        title() {
            return 'Book';
        },
        price() {
            return 500.78;
        },
        releaseYear() {
            return 12;
        },
        rating() {
            return 4.5
        },
        inStock() {
            return false
        },

        me() {
            return {
                id: 1,
                name: 'Sabunkar',
                email: 'tsabunkar@gmail.com',
                age: 24
            }
        },

        post() {
            return {
                id: 1,
                title: 'How good is JS',
                body: 'JS is best',
                published: true
            }
        },

        // *Sending data from client to server
        // ! There are 4 arguments that can be passed to all resolver function, Those are as follows : 
        // ! parent (Useful with Relation Data), args (contains operation argument supplied), 
        // ! ctx (ctx- context, It is useful contextual data), info (informatio about operation)
        greeting(parent, args, ctx, info) {
            // console.log(args);
            // console.log(args.name);
            if (args.name) {
                return `My Name is ${args.name} `;
            } else {
                return `My Name is Ram `;
            }

        },

        add(parent, args, ctx, info) {
            if (args.a && args.b) {
                return (args.a + args.b);
            } else {
                return null;
            }
        },

        grades(parent, args, ctx, info) {
            return [99, 88, 93];
        },

        addMe(parent, args, ctx, info) {
            if (args.numbers.length === 0)
                return 0;

            return args.numbers.reduce((accumlator, currentValue) => {
                return accumlator + currentValue;
            });

        },

        users(parent, args, ctx, info) {
            return USERS;
        },

        searchUsers(parent, args, ctx, info) {
            if (!args.queryFor)
                return USERS;

            return USERS.filter(user => {
                return user.name.toLowerCase().includes(args.queryFor.toLowerCase());
                //if this condition is true then only that element will be returned, else that element will
                // be filtered out.
            });
        },

        posts(parent, args, ctx, info) {
            if (!args.searchFor)
                return POSTS_DATA;

            return POSTS_DATA.filter(post => {
                return post.title.toLowerCase().includes(args.searchFor.toLowerCase()) ||
                    post.body.toLowerCase().includes(args.searchFor.toLowerCase());
            });
        }




    }
}

const USERS = [{
        id: 1,
        name: "tejas",
        email: "tsabunkar",
        age: 24
    },
    {
        id: 2,
        name: "usha",
        email: "ushasabunkar@gmail.com",
        age: 48
    },
    {
        id: 3,
        name: "shailesh",
        email: "shaileshsabunkar@gmail.com",
        age: 50
    },
];

const POSTS_DATA = [{
        id: 1,
        title: "Java",
        body: "Java is OOP paradim language",
        published: true
    },
    {
        id: 2,
        title: "Javascript",
        body: "Javascript is functional paradim language",
        published: true
    },
    {
        id: 3,
        title: "C",
        body: "C is structural paradim language",
        published: false
    },
]

const server = new GraphQLServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});

server.start(() => {
    console.log('Server is running');
});