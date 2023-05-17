export interface  IUserDetail {
  status: string;
  data: Data;
}

export interface Data {
  token: string;
  user: User;
  permissions: Permissions;
}

export interface User {
  id: number;
  uniq_id: string;
  emp_code: string;
  btprofile_id: string;
  usersubscription_id: any;
  credit_cardtoken: string;
  card_number: string;
  expiry_date: string;
  email: string;
  password: string;
  password_changed: number;
  name: string;
  is_beta: number;
  last_name: string;
  short_name: string;
  istype: number;
  photo: string;
  photo_reset: any;
  isactive: number;
  timezone_id: number;
  isemail: number;
  is_agree: number;
  usersub_type: number;
  est_billing_amount: number;
  dt_created: string;
  dt_updated: string;
  dt_last_login: string;
  dt_last_logout: string;
  query_string: string;
  update_email: string;
  update_random: string;
  gaccess_token: string;
  ip: any;
  sig: string;
  desk_notify: number;
  active_dashboard_tab: number;
  is_moderator: number;
  show_default_inner: number;
  custom_active_dashboard_tab: number;
  is_client: number;
  role_id: number;
  salary: number;
  contact_no: string;
  address: string;
  city: string;
  country: string;
  date_of_join: string;
  date_of_relieve: any;
  remember_token: any;
  allow_ems_role_update: string;
  location_id: number;
  resource_technology: string;
  rspl_exp: number;
  tot_exp: string;
  tot_exp_date: any;
  job_level: any;
  deleted_at: any;
  employee_type: any;
  employment_status: any;
  line_of_business: string;
  employee_status: any;
  gender: any;
  age: any;
  work_location: any;
}

export interface Permissions {
  Task: Task;
  Project: Project;
  "Project User": ProjectUser;
  Milestone: Milestone;
  Defect: Defect;
  Risk: Risk;
  Sprint: Sprint;
  Epic: Epic;
  Userstory: Userstory;
  "View All Projects": ViewAllProjects;
  "Project Timesheet": ProjectTimesheet;
  "Show Project Users Tasks": ShowProjectUsersTasks;
  "Org Quality Dashboard": OrgQualityDashboard;
  "View Capacity Planning - Org": ViewCapacityPlanningOrg;
  "Report Configurator": ReportConfigurator;
  "All Project Timesheet": AllProjectTimesheet;
  "Department Timesheet": DepartmentTimesheet;
  "All Department Timesheet": AllDepartmentTimesheet;
  Resource: Resource;
  "Presales Enquiry": PresalesEnquiry;
  "Role Permissions": RolePermissions;
  "Project User Permissions": ProjectUserPermissions;
  "Leave Management": LeaveManagement;
  "All Departments Leave Management": AllDepartmentsLeaveManagement;
  "Project Audit Management": ProjectAuditManagement;
  Backlog: Backlog;
  Rule: Rule;
}

export interface Task {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface Project {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface ProjectUser {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface Milestone {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface Defect {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface Risk {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface Sprint {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface Epic {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface Userstory {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface ViewAllProjects {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface ProjectTimesheet {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface ShowProjectUsersTasks {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface OrgQualityDashboard {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface ViewCapacityPlanningOrg {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface ReportConfigurator {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface AllProjectTimesheet {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface DepartmentTimesheet {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface AllDepartmentTimesheet {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface Resource {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface PresalesEnquiry {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface RolePermissions {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface ProjectUserPermissions {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface LeaveManagement {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface AllDepartmentsLeaveManagement {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface ProjectAuditManagement {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface Backlog {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}

export interface Rule {
  permission_id: number;
  name: string;
  add: number;
  update: number;
  delete: number;
  view: number;
  permission_of: string;
}
