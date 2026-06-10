+++
title = "KubeCon + CloudNativeCon Europe 2026 주요 프로젝트 정리"
date = 2026-06-10
description = "암스테르담에서 열린 KubeCon EU 2026 리캡. DRA GA와 ingress-nginx 아카이빙을 비롯해 행사에서 주목받은 주요 프로젝트를 하나씩 쉽게 풀어 정리했습니다."
[taxonomies]
tags = ["kubernetes", "cncf", "kubecon"]
[extra]
toc = true
+++

KubeCon + CloudNativeCon Europe 2026이 3월 23일부터 26일까지 암스테르담 RAI
컨벤션 센터에서 열렸습니다. 100개국에서 약 13,500명이 참가하고 891개 세션과
16개 co-located 이벤트가 진행된, 역대 최대 규모의 KubeCon Europe였습니다
[1](https://blog.ovhcloud.com/kubecon-cloudnativecon-europe-2026-in-amsterdam-feedback-and-highlights/).
참가자의 절반 가까이(46%)가 첫 참가자였고, 유럽이 CNCF 기여도에서 처음으로
미국을 추월했습니다(38.8% vs 36.3%).

![KubeCon EU 2026 키노트 홀을 가득 채운 참가자들](/images/kceu26_55169871701.jpg)
*암스테르담 RAI 컨벤션 센터의 키노트 홀 전경. 출처:
[CNCF 공식 Flickr 앨범](https://www.flickr.com/photos/143247548@N03/albums/72177720332674037/)*

행사를 관통한 주제는 하나였습니다. Kubernetes는 더 이상 컨테이너
오케스트레이터가 아니라는 것입니다. 이미 생성형 AI 워크로드의 3분의 2가
Kubernetes 위에서 돌고 있고, 플랫폼 전체가 GPU, 에이전트, 추론(inference)
중심으로 재편되고 있습니다
[2](https://www.solo.io/blog/highlights-from-kubecon-cloudnativecon-europe-2026).
다만 격차도 분명합니다. CNCF의 Jonathan Bryce에 따르면 Kubernetes 도입률은
82%에 달하지만, AI를 매일 프로덕션에서 운영하는 조직은 아직 7%에 불과합니다
[3](https://www.kubermatic.com/blog/kubecon-eu-2026-recap/).

## 주요 발표

- **Dynamic Resource Allocation(DRA) GA**:
  [Kubernetes 1.34](https://kubernetes.io/blog/2025/09/01/kubernetes-v1-34-dra-updates/)에서
  GA에 도달했고, NVIDIA와 Google이 각자의 GPU·TPU DRA 드라이버를 CNCF에
  기부했습니다.
- **[ingress-nginx](https://github.com/kubernetes/ingress-nginx) 아카이빙**:
  8년, 275 릴리스를 끝으로 은퇴하며 Gateway API로의 전환이 빨라졌습니다.
- **Kyverno, CNCF Graduated 승격**: KubeCon 주간에 졸업 프로젝트가
  됐습니다.
- **Kubernetes AI Conformance 프로그램**: AI 워크로드를 위한 플랫폼 적합성
  인증이 시작됐습니다.
- **AI Gateway Working Group 발족**: AI 워크로드 네트워킹의 선언적 API 표준을
  정의합니다.
- **에이전트 생태계 표준화**: MCP(Model Context Protocol)가 2025년 12월
  Linux Foundation에 기부된 데 이어,
  [agentregistry](https://github.com/agentregistry-dev/agentregistry)가 CNCF에
  기부되고 agentevals가 공개됐습니다.

## 주요 프로젝트

행사에서 비중 있게 다뤄진 프로젝트를 하나씩 정리했습니다. 인프라를 직접 다루지
않는 분들도 읽을 수 있도록, 각 프로젝트가 무엇을 해주는 도구인지부터 풀어서
설명합니다. 각 프로젝트 이름은 공식 GitHub 저장소로 연결됩니다.

### [Kubernetes](https://github.com/kubernetes/kubernetes)

수백, 수천 대의 서버 위에 애플리케이션을 자동으로 배치하고, 장애가 나면
스스로 복구하는 시스템입니다. 데이터센터의 운영체제라고 부르면 가장
가깝습니다. 이번 행사 최대 뉴스는 **Dynamic Resource Allocation(DRA)의 GA
졸업**입니다. 지금까지 GPU는 CPU·메모리와 달리 복잡한 우회로를 거쳐야 쓸 수
있었는데, 이제 GPU도 메모리 4GB 주세요처럼 자연스럽게 요청할 수 있게
됐습니다
[1](https://kubernetes.io/docs/concepts/scheduling-eviction/dynamic-resource-allocation/).
NVIDIA와 Google이 각자의 DRA 드라이버를 CNCF에 기부하면서 Kubernetes는
특정 벤더에 묶이지 않는 중립적인 AI 인프라 기반으로 자리잡았고
[2](https://www.kubermatic.com/blog/kubecon-eu-2026-recap/),
분산 학습 작업에 GPU를 전부 주거나 아예 안 주는 갱 스케줄링 도구
[Kueue](https://github.com/kubernetes-sigs/kueue)도 함께 주목받았습니다
[3](https://www.kubermatic.com/blog/kubecon-eu-2026-recap/).

`컨테이너 오케스트레이션` `CNCF Graduated`

### [Gateway API](https://github.com/kubernetes-sigs/gateway-api)

외부에서 들어오는 트래픽을 내부의 어느 서비스로 보낼지 정하는, 일종의 건물
정문과 안내데스크 표준입니다. v1.5에서 5개 기능이 정식(standard)으로
승격됐고 [1](https://gateway-api.sigs.k8s.io/), 지난 8년간 사실상의 표준
정문 역할을 해온
**[ingress-nginx](https://github.com/kubernetes/ingress-nginx)가 공식
은퇴**(아카이빙)했습니다. 기존 설정을
새 표준으로 자동 변환해주는
[ingress2gateway](https://github.com/kubernetes-sigs/ingress2gateway) v1.0이
이사 도우미 역할을 합니다
[2](https://blog.ovhcloud.com/kubecon-cloudnativecon-europe-2026-in-amsterdam-feedback-and-highlights/).
신설된 AI Gateway Working Group은 AI 트래픽(모델 호출, 토큰 단위 사용량)을
위한 표준을 이 위에 만듭니다
[3](https://www.solo.io/blog/highlights-from-kubecon-cloudnativecon-europe-2026).

`네트워킹` `트래픽 라우팅`

### [Argo](https://github.com/argoproj/argo-cd)

배포 설정을 Git에 적어두면, 실제 서버 상태를 그 문서와 똑같이 맞춰주는
도구입니다. 사람이 서버에 들어가 명령어를 치는 대신, 문서를 고치면 시스템이
알아서 따라옵니다(이 방식을 GitOps라고 부릅니다). ArgoCon에서는 수십 개
클러스터를 한 번에 관리하는 운영 사례와, 새 버전을 일부 사용자에게만 먼저
열어보는 점진적 배포(프로그레시브 딜리버리)가 중심이었습니다
[1](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/argocon/).
Akuity와 Intuit는 AI 에이전트가 Argo CD를 직접 조작해 롤백과 다중 환경
조율을 수행하는 오픈소스 MCP 서버를 시연했습니다
[2](https://www.kubermatic.com/blog/kubecon-eu-2026-recap/).

`CI/CD` `GitOps`

### [Flux](https://github.com/fluxcd/flux2)

Argo와 같은 GitOps 도구로, 더 가볍고 자동화 파이프라인에 묻어나는 스타일이
특징입니다. 올해 처음으로 **FluxCon이 독립 이벤트로 승격**됐는데
[1](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/fluxcon/),
다른 행사의 한 코너에서 단독 행사로 올라서는 변화는 보통 실제 사용자가 그만큼
늘었다는 신호입니다.

`GitOps` `CD`

### [Cilium](https://github.com/cilium/cilium)

서비스끼리 주고받는 네트워크 통신을 제어하고 들여다보는 도구입니다. 리눅스
커널 안에서 직접 동작하는 eBPF 기술 덕분에, 별도 장비나 추가 프로그램 없이
누가 누구와 통신하는지를 빠르게 통제할 수 있습니다. CiliumCon에서는 보조
컨테이너(사이드카) 없는 서비스 메시와 커널 레벨 보안 감시가 주요 주제였습니다
[1](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/ciliumcon/).

`네트워킹` `보안` `eBPF`

### [Backstage](https://github.com/backstage/backstage)

Spotify가 만든 사내 개발자 포털입니다. 회사 안에 흩어진 서비스 목록, 문서,
새 프로젝트 템플릿을 한 사이트에 모아 사내 개발자용 네이버처럼 쓰는
도구라고 보면 됩니다. BackstageCon은 포털을 만드는 방법보다 운영하면서 얻은
교훈에 집중했습니다. 카탈로그에 무엇을 올리고, 개발자들이 실제로 쓰게 만들려면
어떻게 해야 하는지가 핵심 질문이었습니다
[1](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/backstagecon/).

`개발자 포털` `플랫폼 엔지니어링`

### [Kyverno](https://github.com/kyverno/kyverno)

클러스터의 교칙 검사기입니다. 관리자 권한 컨테이너는 금지, 모든 이미지는
서명 필수 같은 규칙을 코드로 적어두면, 규칙을 어기는 배포를 자동으로 막거나
고쳐줍니다. KubeCon 주간에 **CNCF Graduated(졸업) 프로젝트로 승격**됐습니다
[1](https://www.kubermatic.com/blog/kubecon-eu-2026-recap/).
EU 사이버복원력법(CRA)으로 정책 엔진이 선택이 아닌 필수가 되어가는 시점이라
의미가 더 큽니다. KyvernoCon에서는 단순 차단을 넘어 이미지 서명 검증, 자동
수정(mutation), 그리고 에이전트의 MCP 호출을 정책으로 통제하는 데모까지
다뤄졌습니다
[2](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/kyvernocon/)
[3](https://www.solo.io/blog/highlights-from-kubecon-cloudnativecon-europe-2026).

`정책 엔진` `보안` `CNCF Graduated`

### [Keycloak](https://github.com/keycloak/keycloak)

로그인을 대신 처리해주는 오픈소스 인증 서버입니다. 사내 여러 서비스에 한 번의
로그인으로 들어가는 SSO, 구글/깃허브 계정 연동 같은 기능을 직접 구현하지 않고
가져다 쓸 수 있습니다. 올해 **KeycloakCon이 독립 이벤트로 신설**될 만큼
존재감이 커졌습니다
[1](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/keycloakcon/).

`인증` `IAM`

### [Kubeflow](https://github.com/kubeflow/kubeflow)

머신러닝 모델을 학습시키고 서비스로 내보내는 과정을 Kubernetes 위에서
자동화하는 플랫폼입니다. Cloud Native AI + Kubeflow Day의 중심이었고
[1](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/cloud-native-ai-kubeflow-day/),
업계의 관심이 모델을 만드는 일(학습)에서 만든 모델을 실제 서비스로 돌리는
일(추론 서빙)로 옮겨가는 흐름이 뚜렷했습니다
[2](https://blog.ovhcloud.com/kubecon-cloudnativecon-europe-2026-in-amsterdam-feedback-and-highlights/).

`AI/ML 플랫폼`

### [Dapr](https://github.com/dapr/dapr)

분산 애플리케이션을 만들 때 반복해서 필요한 서비스 간 호출, 메시지 전달,
상태 저장 같은 기능을 표준 API로 제공하는 런타임입니다. 개발자가 인프라
코드를 직접 짜는 대신 공통 부품을 가져다 쓰는 셈입니다. 이번 행사에서는 AI
에이전트를 만들고 운영하기 위한 **Dapr Agents 1.0**이 릴리스됐습니다
[1](https://blog.ovhcloud.com/kubecon-cloudnativecon-europe-2026-in-amsterdam-feedback-and-highlights/).

`애플리케이션 런타임` `에이전트`

### [Prometheus](https://github.com/prometheus/prometheus) & [OpenTelemetry](https://github.com/open-telemetry)

시스템의 건강검진 도구들입니다. Prometheus는 CPU 사용률, 요청 수, 에러율 같은
수치(메트릭)를 시간순으로 기록하고, OpenTelemetry는 하나의 요청이 여러 서비스를
거쳐 가는 경로(트레이스)와 로그까지 표준 형식으로 수집합니다. Observability
Day에서는 두 표준의 수렴과 함께, LLM 추론 워크로드를 어떻게 관측할 것인가라는
새 과제가 논의됐습니다
[1](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/observability-day/).

`관측성` `모니터링`

### [Kepler](https://github.com/sustainable-computing-io/kepler)

워크로드별 전력 소비량을 측정하는 전기 계량기 프로젝트입니다. GPU가 가장
비싼 자원이 되면서, 어떤 서비스가 전력과 비용을 얼마나 쓰는지 측정하는 일이
FinOps(클라우드 비용 관리)의 핵심 과제로 떠올랐습니다
[1](https://blog.ovhcloud.com/kubecon-cloudnativecon-europe-2026-in-amsterdam-feedback-and-highlights/).

`관측성` `FinOps`

### [OpenTofu](https://github.com/opentofu/opentofu)

서버, 네트워크, 데이터베이스 같은 인프라를 클릭 대신 코드로 정의해서 만드는
도구입니다(Infrastructure as Code). Terraform이 라이선스를 바꾸자 커뮤니티가
만든 오픈소스 포크로, Linux Foundation이 관리합니다. 올해 처음 **OpenTofu
Day가 독립 이벤트로 열렸고**
[1](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/opentofu-day/),
포크 이후 커뮤니티가 빠르게 자리잡고 있음을 보여줬습니다.

`IaC` `프로비저닝`

### [WebAssembly](https://github.com/WebAssembly)

원래 웹 브라우저에서 빠르게 코드를 돌리기 위해 만든 실행 형식인데, 이제는
서버에서도 컨테이너보다 가볍고 안전한 실행 환경으로 쓰입니다. 시작이 빠르고
격리가 강해 엣지(사용자 가까운 소형 서버), 서버리스, 플러그인 시스템에 잘
맞습니다. WasmCon이 이 영역을 다뤘습니다
[1](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/co-located-events/wasmcon/).

`런타임` `엣지`

![Hall 12 키노트 입장을 기다리는 참가자들](/images/kceu26_55170264300.jpg)
*키노트가 열린 Hall 12 입구. 16개 co-located 이벤트가 본 행사 전날 같은
공간에서 진행됐습니다. 출처:
[CNCF 공식 Flickr 앨범](https://www.flickr.com/photos/143247548@N03/albums/72177720332674037/)*

## 주목할 트렌드

- **에이전트는 돌리는 것보다 다스리는 게 어렵습니다.** MCP가 행사 전반에
  등장했지만, 정작 세션들이 반복해서 다룬 주제는 에이전트의 인증, 권한 범위
  제한, 감사였습니다. 개발자 노트북에서 운영 데이터베이스로 연결되는 비관리
  MCP 서버, 이른바 섀도우 MCP가 실제 보안 위협으로 지목됐습니다
  [1](https://www.kubermatic.com/blog/kubecon-eu-2026-recap/).
- **EU 사이버복원력법(CRA)이 현실로.** 리눅스 커널 안정 브랜치 메인테이너
  Greg Kroah-Hartman이 키노트에서 직접 짚었습니다. 2026년 9월 11일부터 취약점
  보고가 의무화되고, 2027년 12월 11일부터 전면 시행됩니다. SBOM(소프트웨어
  자재 명세서) 생성이 법적 요구사항이 되어가고 있습니다
  [2](https://www.kubermatic.com/blog/kubecon-eu-2026-recap/).
- **아키텍처 요구사항이 된 디지털 주권.** 이념이 아니라 관할권 문제입니다.
  미국 CLOUD Act 아래에서는 미국 사업자가 전 세계 어디에 저장한 데이터든 제출
  요구를 받을 수 있기 때문입니다. Swisscom은 KubeVirt, Kyverno, Argo CD 등으로
  구성한 첫 주권 Kubernetes 참조 아키텍처를 공개했고, 프랑스 국철 SNCF는
  200개가 넘는 클러스터를 멀티클라우드와 프라이빗 클라우드에 걸쳐 운영하는
  사례를 발표했습니다
  [3](https://www.kubermatic.com/blog/kubecon-eu-2026-recap/).
- **딜리버리 레이어로서의 플랫폼 엔지니어링.** 논의가 플랫폼을 만들어야
  하는가에서 왜 우리 플랫폼은 채택되지 않는가로 옮겨갔습니다. CNCF 플랫폼
  엔지니어링 성숙도 모델 v2가 공개됐고, 에이전트를 사람과 동급의 플랫폼
  사용자로 설계하는 Agent Experience(AX) 개념도 제시됐습니다
  [4](https://www.kubermatic.com/blog/kubecon-eu-2026-recap/).
- **FinOps 2.0.** GPU 사용량이 새로운 비용 중심이 되면서 에너지·자원
  모니터링이 가속기 워크로드까지 확장되고 있습니다.

## 참고 자료

- [KubeCon + CloudNativeCon Europe (LF Events)](https://events.linuxfoundation.org/kubecon-cloudnativecon-europe/)
- [CNCF Unveils Schedule for KubeCon + CloudNativeCon Europe 2026 (CNCF)](https://www.cncf.io/announcements/2025/12/10/cncf-unveils-schedule-for-kubecon-cloudnativecon-europe-2026/)
- [KubeCon EU 2026 feedback and highlights (OVHcloud)](https://blog.ovhcloud.com/kubecon-cloudnativecon-europe-2026-in-amsterdam-feedback-and-highlights/)
- [Highlights from KubeCon + CloudNativeCon Europe 2026 (Solo.io)](https://www.solo.io/blog/highlights-from-kubecon-cloudnativecon-europe-2026)
- [KubeCon EU 2026 Recap (Kubermatic)](https://www.kubermatic.com/blog/kubecon-eu-2026-recap/)
- [세션 녹화 영상 (CNCF YouTube)](https://www.youtube.com/c/cloudnativefdn)
- [공식 행사 사진 (CNCF Flickr)](https://www.flickr.com/photos/143247548@N03/albums/72177720332674037/)
