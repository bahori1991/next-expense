FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm

# Install timezone data and git
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends tzdata git

# Set timezone to Japan Standard Time
ENV TZ=Asia/Tokyo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Create custom prompt script
RUN echo '#!/bin/bash\n\
# Function to get current git branch\n\
get_git_branch() {\n\
    local branch=$(git branch 2>/dev/null | grep "^*" | cut -d" " -f2-)\n\
    if [ -n "$branch" ]; then\n\
        echo " ($branch)"\n\
    fi\n\
}\n\
\n\
# Function to get JST time\n\
get_jst_time() {\n\
    TZ=Asia/Tokyo date "+%H:%M:%S JST"\n\
}\n\
\n\
# Set custom PS1 prompt\n\
export PS1="\\[\\033[32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[34m\\]\\w\\[\\033[33m\\]\\$(get_git_branch)\\[\\033[00m\\] [\\[\\033[36m\\]\\$(get_jst_time)\\[\\033[00m\\]]\\n> "\n\
' > /usr/local/bin/setup-prompt.sh && chmod +x /usr/local/bin/setup-prompt.sh

# Add prompt setup to bashrc for all users and specifically for node user
RUN echo 'source /usr/local/bin/setup-prompt.sh' >> /etc/bash.bashrc
RUN echo 'source /usr/local/bin/setup-prompt.sh' >> /home/node/.bashrc

# Also add to profile files for login shells
RUN echo 'source /usr/local/bin/setup-prompt.sh' >> /etc/profile
RUN echo 'source /usr/local/bin/setup-prompt.sh' >> /home/node/.profile

# Ensure node user owns the files
RUN chown node:node /home/node/.bashrc /home/node/.profile

# Set default shell to bash for node user
RUN usermod -s /bin/bash node

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node modules
# RUN su node -c "npm install -g <your-package-list-here>"
