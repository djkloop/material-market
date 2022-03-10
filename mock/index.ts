import { MockMethod } from 'vite-plugin-mock'
const Mock = require('mockjs')
export default [
  {
    url: '/api/getPlugins',
    method: 'get',
    response: ({ query }) => {
      return Mock.mock({
        code: 200,
        data: {
          [`list|${query.count}`]: [
            {
              id: '@guid',
              author: '@cname', /// 作者名称
              author_avatar: '@image(100x100)', /// 作者头像
              title: '@ctitle(5, 30)', /// 标题
              description: '@cparagraph', /// 描述
              type: '@pick(["vue2","vue3","react","angular"])', /// 类型
              isTeam: '@boolean', /// 当前作者是否是团队
              downloadStatistics: { /// 插件下载统计
                all: '@integer(0, 100000)',
                today: '@integer(0, 400)',
                thisWeek: '@integer(400, 800)',
                thisMonth: '@integer(800, 1600)',
                lastDay: '@integer(0, 800)',
                lastWeek: '@integer(800, 1600)',
                lastMonth: '@integer(100000, 200000)'
              },
              screenshot: '@image("300x200")', /// 预览图
              downloadTimes: '@integer(0, 100000)', /// 下载数
              favoriteTimes: '@integer(0, 100000)', /// 收藏数
              publishTime: '@datetime', /// 发布时间
              createdTime: '@datetime', /// 创建时间
              updatedTime: '@datetime', /// 更新时间
            }
          ]
        }
      })
    },
  },
] as MockMethod[]