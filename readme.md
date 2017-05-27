#tagsystem

##使用方法
tman init $PATH
tap $TAG+ -p $FILE_PATH
tap $TAG+ -r $DIRECT_PATH

ts -f  //显示此文件的标签
ts [tag] //显示此标签的文件
trm [file] //移除此文件
trm -t [tag] //移除此标签
trm -t -f 移除此文件上的此标签
tmv [src] [desc] //移动文件


# 安装
./instal.sh
# 卸载
./uninstall.sh