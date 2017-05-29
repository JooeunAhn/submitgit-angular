export let PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: 'general.menu.dashboard',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'courses',
        data: {
          menu: {
            title: 'Courses',
            icon: 'ion-android-laptop',
            selected: false,
            expanded: false,
            order: 1
          }
        },
        children: [

        ]
      },

      {
        path: 'assignments',
        data: {
          menu: {
            title: 'Assignments',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 2
          }
        },
        children: [
        ]
      },

      {
        path: ['profile', 'edit'],
        data: {
          menu: {
            title: 'Profile',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 3
          }
        }
      },

    ]
  }
];
