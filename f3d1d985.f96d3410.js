(window.webpackJsonp=window.webpackJsonp||[]).push([[96],{235:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return u})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return l}));var a=n(2),r=n(9),o=(n(0),n(240)),i={id:"submitit_launcher",title:"Submitit Launcher plugin",sidebar_label:"Submitit Launcher plugin"},u={id:"plugins/submitit_launcher",title:"Submitit Launcher plugin",description:"!PyPI - License",source:"@site/docs/plugins/submitit_launcher.md",permalink:"/docs/next/plugins/submitit_launcher",editUrl:"https://github.com/facebookresearch/hydra/edit/master/website/docs/plugins/submitit_launcher.md",version:"next",lastUpdatedBy:"J\xe9r\xe9my Rapin",lastUpdatedAt:1592239646,sidebar_label:"Submitit Launcher plugin",sidebar:"Docs",previous:{title:"Nevergrad Sweeper plugin",permalink:"/docs/next/plugins/nevergrad_sweeper"},next:{title:"Overriding packages",permalink:"/docs/next/advanced/overriding_packages"}},s=[{value:"Installation",id:"installation",children:[]},{value:"Usage",id:"usage",children:[]}],c={rightToc:s};function l(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://pypi.org/project/hydra-submitit-launcher/"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://img.shields.io/pypi/v/hydra-submitit-launcher",alt:"PyPI"}))),"\n",Object(o.b)("img",Object(a.a)({parentName:"p"},{src:"https://img.shields.io/pypi/l/hydra-submitit-launcher",alt:"PyPI - License"})),"\n",Object(o.b)("img",Object(a.a)({parentName:"p"},{src:"https://img.shields.io/pypi/pyversions/hydra-submitit-launcher",alt:"PyPI - Python Version"})),"\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://pypistats.org/packages/hydra-submitit-launcher"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://img.shields.io/pypi/dm/hydra-submitit-launcher.svg",alt:"PyPI - Downloads"}))),"\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/facebookresearch/hydra/tree/master/plugins/hydra_submitit_launcher/example"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://img.shields.io/badge/-Example%20application-informational",alt:"Example application"}))),"\n",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/facebookresearch/hydra/tree/master/plugins/hydra_submitit_launcher"}),Object(o.b)("img",Object(a.a)({parentName:"a"},{src:"https://img.shields.io/badge/-Plugin%20source-informational",alt:"Plugin source"})))),Object(o.b)("p",null,"The Submitit Launcher plugin provides a ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://slurm.schedmd.com/documentation.html"}),"SLURM ")," Launcher based on ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/facebookincubator/submitit"}),"Submitit"),"."),Object(o.b)("h3",{id:"installation"},"Installation"),Object(o.b)("p",null,"This plugin requires Hydra 1.0 (Release candidate)"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-commandline"}),"$ pip install hydra-submitit-launcher --pre\n")),Object(o.b)("h3",{id:"usage"},"Usage"),Object(o.b)("p",null,"Once installed, add ",Object(o.b)("inlineCode",{parentName:"p"},"hydra/launcher=submitit")," to your command line. Alternatively, override ",Object(o.b)("inlineCode",{parentName:"p"},"hydra/launcher")," in your config:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"defaults:\n  - hydra/launcher: submitit\n")),Object(o.b)("p",null,"Note that this plugin expects a valid environment in the target host. usually this means a shared file system between\nthe launching host and the target host."),Object(o.b)("p",null,"Submitit supports 3 types of queues: auto, local and slurm. Its config looks like this"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'class QueueType(Enum):\n    auto = "auto"\n    local = "local"\n    slurm = "slurm"\n\n\n@dataclass\nclass SlurmQueueConf:\n    # Params are used to configure sbatch, for more info check:\n    # https://github.com/facebookincubator/submitit/blob/master/submitit/slurm/slurm.py\n\n    # maximum time for the job in minutes\n    time: int = 60\n    # number of cpus to use for each task\n    cpus_per_task: int = 10\n    # number of gpus to use on each node\n    gpus_per_node: int = 1\n    # number of tasks to spawn on each node\n    ntasks_per_node: int = 1\n    # number of nodes to use for the job\n    nodes: int = 1\n    # memory to reserve for the job on each node, in GB\n    mem: str = "${hydra.launcher.mem_limit}GB"\n    # slurm partition to use on the cluster\n    partition: Optional[str] = None\n    # USR1 signal delay before timeout\n    signal_delay_s: int = 120\n    # name of the job\n    job_name: str = "${hydra.job.name}"\n    # Maximum number of retries on job timeout.\n    # Change this only after you confirmed your code can handle re-submission\n    # by properly resuming from the latest stored checkpoint.\n    # check the following for more info on slurm_max_num_timeout\n    # https://github.com/facebookincubator/submitit/blob/master/docs/checkpointing.md\n    max_num_timeout: int = 0\n\n\n@dataclass\nclass LocalQueueConf:\n    # local executor mocks the behavior of slurm locally\n\n    # maximum time for the job in minutes\n    timeout_min: int = 60\n    # number of gpus to use on each node\n    gpus_per_node: int = 1\n    # number of tasks to spawn on each node (only one node available in local executor)\n    tasks_per_node: int = 1\n\n\n@dataclass\nclass AutoQueueConf:\n    # auto executor automatically identifies and uses available cluster\n    # Currently this is only slurm, but local executor can be manually forced\n    # instead.\n    # Most parameters are shared between clusters, some can be cluster specific\n\n    # cluster to use (currently either "slurm" or "local" are supported,\n    # None defaults to an available cluster)\n    cluster: Optional[str] = None\n\n    # maximum time for the job in minutes\n    timeout_min: int = 60\n    # number of cpus to use for each task\n    cpus_per_task: int = 1\n    # number of gpus to use on each node\n    gpus_per_node: int = 0\n    # number of tasks to spawn on each node\n    tasks_per_node: int = 1\n    # memory to reserve for the job on each node (in GB)\n    mem_gb: int = 4\n    # number of nodes to use for the job\n    nodes: int = 1\n    # name of the job\n    name: str = "${hydra.job.name}"\n\n    # following parameters are SLURM specific\n\n    # Maximum number of retries on job timeout.\n    # Change this only after you confirmed your code can handle re-submission\n    # by properly resuming from the latest stored checkpoint.\n    # check the following for more info on slurm_max_num_timeout\n    # https://github.com/facebookincubator/submitit/blob/master/docs/checkpointing.md\n    slurm_max_num_timeout: int = 0\n    # USR1 signal delay before timeout for the slurm queue\n    slurm_signal_delay_s: int = 30\n    # slurm partition to use on the cluster\n    slurm_partition: Optional[str] = None\n\n\n@dataclass\nclass QueueParams:\n    slurm: SlurmQueueConf = SlurmQueueConf()\n    local: LocalQueueConf = LocalQueueConf()\n    auto: AutoQueueConf = AutoQueueConf()\n\n\n@dataclass\nclass SubmititConf:\n    queue: QueueType = QueueType.local\n\n    folder: str = "${hydra.sweep.dir}/.${hydra.launcher.params.queue}"\n\n    queue_parameters: QueueParams = QueueParams()\n')),Object(o.b)("p",null,"See ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/facebookincubator/submitit"}),"Submitit documentation")," for full details about the parameters above."),Object(o.b)("p",null,"An ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/facebookresearch/hydra/tree/master/plugins/hydra_submitit_launcher/example"}),"example application")," using this launcher is provided in the plugin repository."),Object(o.b)("p",null,"Starting the app with ",Object(o.b)("inlineCode",{parentName:"p"},"python my_app.py task=1,2,3 -m")," will launch 3 executions:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"$ python my_app.py task=1,2,3 -m\n[HYDRA] Sweep output dir : multirun/2020-05-28/15-05-22\n[HYDRA]        #0 : task=1\n[HYDRA]        #1 : task=2\n[HYDRA]        #2 : task=3\n")),Object(o.b)("p",null,"You will be able to see the output of the app in the output dir:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-commandline"}),"$ tree\n.\n\u251c\u2500\u2500 0\n\u2502\xa0\xa0 \u2514\u2500\u2500 my_app.log\n\u251c\u2500\u2500 1\n\u2502\xa0\xa0 \u2514\u2500\u2500 my_app.log\n\u251c\u2500\u2500 2\n\u2502\xa0\xa0 \u2514\u2500\u2500 my_app.log\n\u2514\u2500\u2500 multirun.yaml\n\n\n$ cat 0/my_app.log \n[2020-05-28 15:05:23,511][__main__][INFO] - Process ID 15887 executing task 1 ...\n[2020-05-28 15:05:24,514][submitit][INFO] - Job completed successfully\n")))}l.isMDXComponent=!0},240:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return h}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),l=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):u(u({},t),e)),n},m=function(e){var t=l(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},b=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),m=l(n),b=a,h=m["".concat(i,".").concat(b)]||m[b]||p[b]||o;return n?r.a.createElement(h,u(u({ref:t},c),{},{components:n})):r.a.createElement(h,u({ref:t},c))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=b;var u={};for(var s in t)hasOwnProperty.call(t,s)&&(u[s]=t[s]);u.originalType=e,u.mdxType="string"==typeof e?e:a,i[1]=u;for(var c=2;c<o;c++)i[c]=n[c];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"}}]);