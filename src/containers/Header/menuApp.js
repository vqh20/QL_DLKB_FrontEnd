export const adminMenu = [

    { //quan li nguoi dung
        name: 'menu.admin.manager-user', 
        menus: [
            // {
            //     name: 'menu.admin.crud', link: '/system/user-manage',
                
            // },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux',
                
            },
            {
                name: 'menu.admin.manager-doctor', link: '/system/manage-doctor',
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            // {
            //     name: 'menu.admin.manager-admin', link: '/system/user-admin',
                
            // },
            { //quan li kế hoach khám bệnh
               
                name: 'menu.doctor.manager-schedule', link: '/doctor/manage-schedule',
                
            },
            // { //quan li benh nhan khám bệnh
               
            //     name: 'menu.doctor.manager-patient', link: '/doctor/manage-patient',
                
            // },
            
        ]
    },
    { //quan li phong kham
        name: 'menu.admin.clinic', 
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic',
                
            },
        ]
    },
    { //quan li chuyên khoa
        name: 'menu.admin.specialty', 
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty',
                
            },
        ]
    },{ //quan li cẩm nang
        name: 'menu.admin.handbook', 
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/doctor/manage-schedule',
                
            },
        ]
    },
];
export const doctorMenu = [
    {
        name: 'menu.admin.manager-user',
        menus: [
            { //quan li kế hoach khám bệnh                
                name: 'menu.doctor.manager-schedule', link: '/doctor/manage-schedule',                 
            },
            { //quan li benh nhan khám bệnh
               
                name: 'menu.doctor.manager-patient', link: '/doctor/manage-patient',
                
            },
        ]
    
}
];