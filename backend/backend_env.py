from pathlib import Path
import logging, os

base_dir                  = Path(__file__).parents[0]
guidelines_pgm            = base_dir     / 'guidelines.medik'
guidelines_mcheck_pgm     = base_dir     / 'guidelines-mcheck.medik'
driver_pgm                = base_dir     / 'driver.medik'
screening_only_driver_pgm = base_dir     / 'screening_only_driver.medik'
ghosts_pgm                = base_dir     / 'ghosts.medik'
stuck_pattern             = base_dir     / 'stuck-pattern.k'
medik_dir                 = base_dir     / 'ext'          / 'medik-semantics'
kompiled_exec_dir         = medik_dir    / '.build'       / 'llvm-exec'      / 'medik-llvm-kompiled'
kompiled_mcheck_dir       = medik_dir    / '.build'       / 'llvm-mcheck'    / 'medik-llvm-kompiled'
krelease_dir              = medik_dir    / 'ext'          / 'k'              / 'k-distribution'      / 'target' / 'release' / 'k'
kbin_dir                  = krelease_dir / 'bin'

def set_env():
    if os.getenv('LOGINFO'):
        logging.basicConfig(level=logging.INFO)
    if os.getenv('LOGDEBUG'):
        logging.basicConfig(level=logging.DEBUG)

    path_entires = [ kbin_dir ]
    os.environ['PATH'] = str(kbin_dir.resolve()) \
                                + os.pathsep + os.environ['PATH']

