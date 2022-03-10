export type LibType = 'vue2' | 'vue3'

export interface ListItem {
  id: string,
  author: string, /// 作者名称
  title: string, /// 标题
  description: string, /// 描述
  type: LibType, /// 类型
  isTeam: boolean, /// 当前作者是否是团队
  downloadStatistics: { /// 插件下载统计
    all: number,
    today: number,
    thisWeek: number,
    thisMonth: number,
    lastDay: number,
    lastWeek: number,
    lastMonth: number
  },
  screenshot: string, /// 预览图
  downloadTimes: number, /// 下载数
  favoriteTimes: number, /// 收藏数
  publishTime: number, /// 发布时间
  createdTime: number, /// 创建时间
  updatedTime: number, /// 更新时间
}


interface Data {
  list: Array<ListItem>
}

export interface PluginsList {
  code: number;
  data: Data
}