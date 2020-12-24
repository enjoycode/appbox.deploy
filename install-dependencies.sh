#!/bin/bash

if [ -f "/etc/os-release" ]; then
    . /etc/os-release
elif [ -f "/etc/arch-release" ]; then
    export ID=arch
else
    echo "/etc/os-release missing."
    exit 1
fi

debian_packages=(
    ragel
    libhwloc-dev
    libnuma-dev
    libpciaccess-dev
    libcrypto++-dev
    libboost-all-dev
    libxml2-dev
    xfslibs-dev
    libgnutls28-dev
    liblz4-dev
    libsnappy1v5
    libsctp-dev
    libprotobuf-dev
    systemtap-sdt-dev
    libtool
    libyaml-cpp-dev
    libc-ares-dev
    stow
    libfmt-dev
    diffutils
)

redhat_packages=(
    hwloc-devel
    numactl-devel
    libpciaccess-devel
    cryptopp-devel
    libxml2-devel
    xfsprogs-devel
    gnutls-devel
    lksctp-tools-devel
    lz4-devel
    protobuf-devel
    protobuf-compiler
    systemtap-sdt-devel
    libtool
    yaml-cpp-devel
    c-ares-devel
    stow
    diffutils
)

fedora_packages=(
    "${redhat_packages[@]}"
    ragel
    boost-devel
    fmt-devel
    libubsan
    libasan
    libatomic
)

centos_packages=(
    "${redhat_packages[@]}"
    ragel
    rh-mongodb36-boost-devel
    devtoolset-8-libubsan
    devtoolset-8-libasan
    devtoolset-8-libatomic
)


arch_packages=(
    ninja
    ragel
    boost
    boost-libs
    hwloc
    numactl
    libpciaccess
    crypto++
    libxml2
    xfsprogs
    gnutls
    lksctp-tools
    lz4
    protobuf
    libtool
    yaml-cpp
    stow
    c-ares
    fmt
    glibc
    filesystem
)

opensuse_packages=(
    c-ares-devel
    hwloc-devel
    libboost_filesystem1_66_0
    libboost_filesystem1_66_0-devel
    libboost_program_options1_66_0
    libboost_program_options1_66_0-devel
    libboost_system1_66_0
    libboost_system1_66_0-devel
    libboost_test1_66_0
    libboost_test1_66_0-devel
    libboost_thread1_66_0
    libboost_thread1_66_0-devel
    libcryptopp-devel
    libboost_atomic1_66_0
    libboost_atomic1_66_0-devel
    libboost_date_time1_66_0
    libboost_date_time1_66_0-devel
    libboost_chrono1_66_0
    libboost_chrono1_66_0-devel
    libgnutls-devel
    libgnutlsxx28
    liblz4-devel
    libnuma-devel
    lksctp-tools-devel
    ninja protobuf-devel
    ragel
    xfsprogs-devel
    yaml-cpp-devel
    libtool
    stow
)

if [ "$ID" = "ubuntu" ] || [ "$ID" = "debian" ]; then
    apt-get install -y "${debian_packages[@]}"
elif [ "$ID" = "centos" ] || [ "$ID" = "fedora" ]; then
    if [ "$ID" = "fedora" ]; then
        dnf install -y "${fedora_packages[@]}"
    else # centos
        yum install -y epel-release centos-release-scl scl-utils
        yum install -y "${centos_packages[@]}" 
    fi
elif [ "$ID" = "arch" ]; then
    # main
    if [ "$EUID" -eq "0" ]; then
        pacman -Sy --needed --noconfirm "${arch_packages[@]}"
    else
        echo "Running without root. Skipping main dependencies (pacman)." 1>&2
    fi
elif [ "$ID" = "opensuse-leap" ]; then
    zypper install -y "${opensuse_packages[@]}"
else
    echo "Your system ($ID) is not supported by this script. Please install dependencies manually."
    exit 1
fi
