export interface Root {
  logTimes: LogTime[]
  month: Month
  day  : Day
}

export interface LogTime {
  log_id: number
  project_id: number
  task_id: number
  total_hours: number
  task: Task
  project: Project
  timelog_approver: any
}

export interface Task {
  id: number
  name: string
}

export interface Project {
  id: number
  name: string
}

export interface Month {
  logTimeTotal: number
  total_month_hrs: number
  logTimeTotalLeave: number
}
export interface Day {
  logTimeTotalDay : number
  total_day_hours : number
}
