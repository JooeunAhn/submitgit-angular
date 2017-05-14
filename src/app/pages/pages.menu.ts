export const PAGES_MENU = [
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
          {
            path: '1',
            data: {
              menu: {
                title: 'course 1',
              }
            }
          }
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
          {
            path: '1',
            data: {
              menu: {
                title: 'assignment 1',
              }
            }
          }
        ]
      },
    ]
  }
];
