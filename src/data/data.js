
import dp from '../assets/images/tasks/dp.png'
import girlDp from '../assets/images/girldp.png'
export const tasks = [
    {
        _id: 1,
        assignedBy: 'Muhammad Zain',
        title: 'Mobile App UI Design',
        description: 'Create a design system for a hero section in 2 different variants. Create a simple presentation with these components.',
        
    }
]

export const users = [
    {value: 'muhammad_zain', label: 'Muhammad Zain', image: dp},
    {value: 'hamza', label: 'Hamza', image: dp},
    {value: 'dilawar', label: 'Dilawar',image: dp},
    {value: 'ahtesham', label: 'Ahtesham',image: dp},
    {value: 'Arsalan', label: 'Arsalan',image: dp},
    {value: 'asif_zulfiqar', label: 'Asif Zulfiqar',image: dp},
    {value: 'zain', label: 'Muhammad Zain',image: dp},
  ];
  
export  const comments = [
    {
      name: "Muhammad Zain",
      comment: "added a feedback",
      type: 'feedback',
      time: "Just now",
      abbr: "MZ",
    },
    {
      name: "Hamza Nafasat",
      comment: "added a document file in the task",
      time: "Yesterday",
      abbr: "HN",
    },
    {
      name: "Ahtsham Jutt",
      comment: "added a new comment in the task",
      time: "23 July 2023   12:00 PM",
      abbr: "AJ",
    },
    {
      name: "Asif Zulfiqar",
      comment: "replied to your comment 'Hello World'",
      time: "Just now",
      abbr: "AZ",
    },
    {
      name: "Muhammad Zain",
      comment: "added a document file in the task.",
      time: "Just now",
      abbr: "MZ",
    },
    {
      name: "Hamza Nafasat",
      comment: "added a document file in the task.",
      time: "Yesterday",
      abbr: "HN",
    },
    {
      name: "Ahtsham Jutt",
      comment: "added a new comment in the task.",
      time: "23 July 2023   12:00 PM",
      abbr: "AJ",
    },
    {
      name: "Asif Zulfiqar",
      comment: "replied to your comment 'Hello World'.",
      time: "Just now",
      abbr: "AZ",
    },
  ];

  export const notificationsRows = [
    {
      notificationType: 'Alert',
      message: "You're added in fleet management project",
      time: '12:09 pm',
      url: 'url'
    },
    {
      notificationType: 'Alert',
      message: "You're added in fleet management project",
      time: '12:09 pm',
      url: 'url'
    },
    {
      notificationType: 'Alert',
      message: "You're added in fleet management project",
      time: '12:09 pm',
      url: 'url'
    },
    {
      notificationType: 'Alert',
      message: "You're added in fleet management project",
      time: '12:09 pm',
      url: 'url'
    },
    {
      notificationType: 'Alert',
      message: "You're added in fleet management project",
      time: '12:09 pm',
      url: 'url'
    },
  ]

  export const users2 = [
    {
      userName: 'asif8',
      name: 'Asif Zulfiqar',
      email: 'asifzulfiqar@gmail.com',
      position: 'Web Developer',
      inProgressTasks: '2',
      completedTasks: '4',
      scheduledTasks: '6',
      gender: 'male',
      ratings: '4.9',
      profilePicture: dp
    },
    {
      userName: 'sara21',
      name: 'Sara Ahmed',
      email: 'sara.ahmed@gmail.com',
      position: 'UI/UX Designer',
      inProgressTasks: '3',
      completedTasks: '5',
      scheduledTasks: '7',
      gender: 'female',
      ratings: '4.8',
      profilePicture: girlDp
    },
    {
      userName: 'hamzadoe',
      name: 'Hamza Doe',
      email: 'hamza.doe@gmail.com',
      position: 'Mern Developer',
      inProgressTasks: '4',
      completedTasks: '6',
      scheduledTasks: '8',
      gender: 'male',
      ratings: '4.7',
      profilePicture: dp
    },
    {
      userName: 'emmaW',
      name: 'Emma Watson',
      email: 'emma.watson@gmail.com',
      position: 'Product Manager',
      inProgressTasks: '1',
      completedTasks: '7',
      scheduledTasks: '4',
      gender: 'female',
      ratings: '4.9',
      profilePicture: girlDp
    },
    {
      userName: 'mike123',
      name: 'Mike Johnson',
      email: 'mike.johnson@gmail.com',
      position: 'Data Scientist',
      inProgressTasks: '5',
      completedTasks: '3',
      scheduledTasks: '6',
      gender: 'male',
      ratings: '4.6',
      profilePicture: dp
    },
    {
      userName: 'lisaM',
      name: 'Lisa Monroe',
      email: 'lisa.monroe@gmail.com',
      position: 'Marketing Specialist',
      inProgressTasks: '2',
      completedTasks: '8',
      scheduledTasks: '5',
      gender: 'female',
      ratings: '4.8',
      profilePicture: girlDp
    }
  ];

  export const faceExpressions = [
    { label: 'Very Bad', icon: '🙁' },
    { label: 'Bad', icon: '😶' },
    { label: 'Average', icon: '😐' },
    { label: 'Good', icon: '🙂' },
    { label: 'Excellent', icon: '😊' },
  ];