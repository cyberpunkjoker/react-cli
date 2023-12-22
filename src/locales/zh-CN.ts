export interface StringDict {
  [key: string]: string;
}

export const menu: StringDict = {
  '/userComment': '用户评论查询',
  '/anchorAnswer': '主播解答查询',
  '/punchingLog': '打卡日志',
  '/privateLetterLog': '私信操作日志',
  '/commentsMark': '评论打标',

  '/baseConfig': '配置管理',
  '/serviceConfig': '服务号配置',
  '/liveTabConfig': 'Tab页展示配置',
  // '/faqScoreSetting': '人机协助分数阈值设置',
  '/answerConfig': '互动类型答案配置',

  '/digitalPersonConfig': '初始化配置管理',
  '/digitalAnswerConfig': '互动类型答案配置',
  // '/welcomeConfig': '直播欢迎语配置',
  '/notEditedConfig': '真人未编辑兜底话术相关配置',
  '/appeaseConfig': '排队安抚话术配置',
  '/noQuestionSetting': '无人提问话术相关配置',
  '/quickReplyConfig': '快捷回复话术配置',
  '/sensitiveWordConfig': '敏感词分类管理',
  '/sensitiveWordManage': '敏感词管理',
  // '/repeatBroadcast': '重复内容播报配置',
  // '/turnToManualConfig': '转人工配置',
  '/pinFilterConfig': '特殊昵称过滤配置',
  '/overFlowConfig': '直播间溢出策略',
  '/anchorSensitiveWord': '主播编辑敏感词配置',
  '/screenMonitoring': '监控大屏'
};