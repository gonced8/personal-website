---
key: Raposo2021
year: 2021
date: 2021-07-06
reference: "G. Raposo, P. Tomas, and N. Roma, \"PositNN: Training Deep Neural Networks with Mixed Low-Precision Posit,\" in ICASSP 2021 - 2021 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP), 2021, pp. 7908–7912, doi: 10.1109/ICASSP39728.2021.9413919 [Online]. Available: https://ieeexplore.ieee.org/document/9413919"
link:
  name: PDF
  url: "docs/Raposo2021-PositNN_Training_Deep_Neural_Networks_with_Mixed_Low_Precision_Posit.pdf"
---

@InProceedings{Raposo2021,
  author      = {Gonçalo Raposo and Pedro Tom{\'{a}}s and Nuno Roma},
  booktitle   = {\{ICASSP\} 2021 - 2021 {IEEE} International Conference on Acoustics, Speech and Signal Processing ({ICASSP})},
  title       = {\{PositNN: Training Deep Neural Networks with Mixed Low-Precision Posit\}},
  year        = {2021},
  month       = {jun},
  pages       = {7908–7912},
  publisher   = {\{IEEE\}},
  abstract    = {Low-precision formats have proven to be an efficient way to reduce not only the memory footprint but also the hardware resources and power consumption of deep learning computations. Under this premise, the posit numerical format appears to be a highly viable substitute for the IEEE floating-point, but its application to neural networks training still requires further research. Some preliminary results have shown that 8-bit (and even smaller) posits may be used for inference and 16-bit for training, while maintaining the model accuracy. The presented research aims to evaluate the feasibility to train deep convolutional neural networks using posits. For such purpose, a software framework was developed to use simulated posits and quires in end-to-end training and inference. This implementation allows using any bit size, configuration, and even mixed precision, suitable for different precision requirements in various stages. The obtained results suggest that 8-bit posits can substitute 32-bit floats during training with no negative impact on the resulting loss and accuracy.},
  doi         = {10.1109/ICASSP39728.2021.9413919},
  eprint      = {2105.00053},
  eprintclass = {cs.LG},
  eprinttype  = {arXiv},
  keywords    = {posit numerical format, low-precision arithmetic, deep neural networks, training, inference},
  url         = {https://ieeexplore.ieee.org/document/9413919},
}
