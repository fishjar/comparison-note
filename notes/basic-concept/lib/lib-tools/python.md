```sh
# 更新 pip
python3 -m pip install --user --upgrade pip
python3 -m pip --version

# 安装 virtualenv （Python 3.3 以上无需安装）
python3 -m pip install --user virtualenv

# 创建虚拟环境
python3 -m venv env
# 创建虚拟环境后，您可以激活它。
source env/bin/activate
# 离开虚拟环境
deactivate

# 检查 python 路径
which python
```

```sh
pip search astronomy
pip install novas
pip install request
pip install requests==2.6.0
pip install requests>=2.0.0,<3.0.0
pip install --upgrade requests
pip show requests
pip list
pip freeze > requirements.txt
pip install -r requirements.txt
```
