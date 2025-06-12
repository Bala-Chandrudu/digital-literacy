export const mockCourses = [
  {
    id: '1',
    title: 'Computer Basics',
    description: 'Learn the fundamental concepts of computers, including hardware components, operating systems, and basic operations.',
    thumbnail: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    modules: [
      {
        id: '1-1',
        title: 'Introduction to Computers',
        description: 'Understand what computers are and their basic components.',
        lessons: [
          {
            id: '1-1-1',
            title: 'What is a Computer?',
            content: 'A computer is an electronic device that manipulates information, or data. It has the ability to store, retrieve, and process data.',
            videoUrl: 'https://www.youtube.com/embed/qfUZBKDh9BY?si=1Pk5pQXXHv5lnOq2',
          },
          {
            id: '1-1-2',
            title: 'Computer Hardware Components',
            content: 'Learn about basic hardware components like CPU, RAM, Hard Drive, and more.',
            videoUrl: 'https://www.youtube.com/embed/8_itvuz5Dc4?si=SPhmaHcTIkkYTtpf',
          }
        ]
      },
      {
        id: '1-2',
        title: 'Using a Mouse and Keyboard',
        description: 'Learn how to effectively use input devices.',
        lessons: [
          {
            id: '1-2-1',
            title: 'Mouse Basics',
            content: 'Learn how to click, double-click, right-click, and drag using a mouse.',
            videoUrl: 'https://www.youtube.com/embed/uDHjuY5olC4?si=BtRpV0bP_uTM8GFo',
            quiz: {
              id: 'q1-2-1',
              title: 'Mouse Basics Quiz',
              questions: [
                {
                  id: 'q1-2-1-1',
                  text: 'What action opens a context menu?',
                  options: ['Left click', 'Right click', 'Double click', 'Middle click'],
                  correctAnswer: 1
                },
                {
                  id: 'q1-2-1-2',
                  text: 'How do you typically select an item?',
                  options: ['Right click', 'Double click', 'Left click', 'Hover'],
                  correctAnswer: 2
                }
              ]
            }
          }
        ]
      }
    ],
    level: 'beginner',
    language: 'english',
    author: 'Digital Literacy Team',
    createdAt: '2023-01-01',
  },
  {
    id: '2',
    title: 'Internet Safety',
    description: 'Learn how to safely browse the internet, protect your personal information, and avoid common online threats.',
    thumbnail: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    modules: [
      {
        id: '2-1',
        title: 'Internet Basics',
        description: 'Understand what the internet is and how to use it.',
        lessons: [
          {
            id: '2-1-1',
            title: 'What is the Internet?',
            content: 'The Internet is a global network of computers that works like a postal system for information.',
            videoUrl: 'https://www.youtube.com/embed/x3c1ih2NJEg',
          }
        ]
      },
      {
        id: '2-2',
        title: 'Online Safety',
        description: 'Learn how to stay safe while browsing the internet.',
        lessons: [
          {
            id: '2-2-1',
            title: 'Creating Strong Passwords',
            content: 'Learn how to create and manage strong passwords to protect your accounts.',
            videoUrl: 'https://www.youtube.com/embed/YitHISP0Isk?si=X-c8sRI-InBDlDwo',
            quiz: {
              id: 'q2-2-1',
              title: 'Password Security Quiz',
              questions: [
                {
                  id: 'q2-2-1-1',
                  text: 'Which of these is the strongest password?',
                  options: ['password123', 'Birthday1990', 'T#7pL@4sQ!2r', 'myname'],
                  correctAnswer: 2
                }
              ]
            }
          }
        ]
      }
    ],
    level: 'beginner',
    language: 'english',
    author: 'Digital Literacy Team',
    createdAt: '2023-01-15',
  },
  {
    id: '3',
    title: 'MS Office Basics',
    description: 'Learn how to use Microsoft Office applications including Word, Excel, and PowerPoint.',
    thumbnail: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    modules: [
      {
        id: '3-1',
        title: 'Microsoft Word',
        description: 'Learn how to create and format documents in Microsoft Word.',
        lessons: [
          {
            id: '3-1-1',
            title: 'Creating Your First Document',
            content: 'Learn how to create, edit, format and save a document in Microsoft Word.',
            videoUrl: 'https://www.youtube.com/embed/S-nHYzK-BVg',
          }
        ]
      }
    ],
    level: 'beginner',
    language: 'english',
    author: 'Digital Literacy Team',
    createdAt: '2023-02-01',
  },
  {
    id: '4',
    title: 'Mobile Apps Basics',
    description: 'Learn how to use essential mobile applications for daily tasks like payments, messaging, and more.',
    thumbnail: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    modules: [
      {
        id: '4-1',
        title: 'Digital Payments',
        description: 'Learn how to safely make digital payments using mobile apps.',
        lessons: [
          {
            id: '4-1-1',
            title: 'Introduction to UPI',
            content: 'Learn about the Unified Payments Interface and how it works.',
            videoUrl: 'https://www.youtube.com/embed/2NvUqcioR7o?si=voZM16Lmj55G7sqR',
          }
        ]
      }
    ],
    level: 'beginner',
    language: 'english',
    author: 'Digital Literacy Team',
    createdAt: '2023-02-15',
  }
];