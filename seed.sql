USE usof;
INSERT INTO users(login, password, full_name, email)
VALUES (
    "user1",
    "$2a$10$9cQmVqe2Hz6aKX0YqYgvXeDKCbKHhj330ujNxDR7k/yubLoIWiswe",
    "TEST USER 1",
    "surprisedsunrise@gmail.com"
  ),
  (
    "user2",
    "$2a$10$/mA3np4tWg7hsj.Jl9SGmO9BglTllhZxnLrHI7ATWT4VoraU2KC7i",
    "TEST USER 2",
    "user2@gmail.com"
  ),
  (
    "user3",
    "$2a$10$d0n1G5dNVTfGJEvrSxRU9OZrABWQ9ICBL24lONWYWrIUFp11Fx6c.",
    "TEST USER 3",
    "user3@gmail.com"
  ),
  (
    "user4",
    "$2a$10$iIGjYwWQUtrSMuh9RVQYNupBalea0Q6qeBzrtHhlw/5bpWWeRscDe",
    "TEST USER 4",
    "user4@gmail.com"
  ),
  (
    "user5",
    "$2a$10$dISBkirxSiwQnhy2m8SoHuJ2wgYGLkwsF9He5UWVOMLBo2NtKkKxa",
    "TEST USER 5",
    "user5@gmail.com"
  ),
  (
    "user6",
    "$2a$10$u9xQmmo6ejTv/ex021wq9eKZVpIpfwdpE6RrRqp5M6P/qOzDBXh22",
    "TEST USER 6",
    "user6@gmail.com"
  ),
  (
    "user7",
    "$2a$10$.qGwjVv/39t.nLEg5DFpkO3oz72MCNsOF6a6ijuMKBmluaH5qAfIq",
    "TEST USER 7",
    "user7@gmail.com"
  );
INSERT INTO categories(title, description)
VALUES (
    "bootstrap",
    "Powerful, extensible, and feature-packed frontend toolkit."
  ),
  (
    "Java",
    "Java is a popular high-level programming language. Use this tag when you&#39;re having problems using or understanding the language itself"
  ),
  (
    "SQL",
    "SQL is a standard language for accessing and manipulating databases."
  ),
  (
    "reactjs",
    "React is a JavaScript library for building user interfaces. It uses a declarative, component-based paradigm and aims to be both efficient and flexible."
  ),
  (
    "Android",
    "Android is Google&#39;s mobile operating system, used for programming or developing digital devices (Smartphones, Tablets, Automobiles, TVs, Wear, Glass, IoT)"
  );
INSERT INTO posts(title, content, category_id, user_id)
VALUES (
    "Question about android",
    "What is android?",
    5,
    1
  ),
  (
    "Question about SQL",
    "Give me the website of SQL",
    3,
    2
  ),
  (
    "Question about bootstrap",
    "I need a list of the classes that are most oftenly used",
    1,
    3
  ),
  (
    "Question about reactjs",
    "When to use context?",
    4,
    4
  ),
  (
    "Question about Java",
    "How popular is Java right now?",
    2,
    5
  );
INSERT INTO post_categories(post_id, category_id)
VALUES (1, 5),
  (2, 3),
  (3, 1),
  (4, 4),
  (5, 2);
INSERT INTO answers(body, user_id, post_id)
VALUES (
    "Android is a mobile operating system based on a modified version of the Linux kernel and other open source software, designed primarily for touchscreen mobile devices such as smartphones and tablets.",
    5,
    1
  ),
  ("https://www.mysql.com/", 4, 2),
  (
    "You can see it on https://www.w3schools.com/bootstrap/bootstrap_ref_all_classes.asp",
    3,
    3
  ),
  (
    "React context is great when you are passing data that can be used in any component in your application. These types of data include: Theme data (like dark or light mode)",
    2,
    4
  ),
  (
    "ccording to Google Trends, the programming languages most searched for are Python, Java and JavaScript. Python overtook Java in 2019, and it looks like Java is going to get behind JavaScript in 2022.",
    1,
    5
  );
INSERT INTO comments(content, user_id, post_id)
VALUES ("I need more information", 1, 4),
  ("I think I can help you in this", 1, 4),
  ("I need more information", 2, 5),
  (
    "You could have found such information yourself",
    1,
    5
  ),
  ("I need more information", 3, 1);
INSERT INTO likes(type, user_id, answer_id)
VALUES (1, 2, 3),
  (2, 3, 1),
  (1, 1, 2),
  (1, 4, 5),
  (2, 5, 4);