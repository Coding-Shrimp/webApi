module.exports = {
  apps : [{
    name: "api",
    script: './index.js',
    watch: [
      'router',
      'public'
    ],
    error_file : "./logs/app-err.log", // 错误日志路径
    out_file : "./logs/app-out.log", // 普通日志路径
    log_date_format:"YYYY-MM-DD HH:mm Z",
    max_memory_restart: "500M",
  }],

  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '127.0.0.1',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : './',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --watch --env production',
  //     'pre-setup': '',
  //     "instances": "max",
  //     "instance_var": "INSTANCE_ID",
  //   }
  // }
};
