from pathlib import Path
import logging, os

base_dir        = Path(__file__).parents[0]
guidelines_pgm  = base_dir     / 'guidelines.medik'
driver_pgm      = base_dir     / 'driver.medik'
ghosts_pgm      = base_dir     / 'ghosts.medik'
medik_dir       = base_dir     / 'ext'          / 'medik-semantics'
kompiled_dir    = medik_dir    / '.build'       / 'llvm-exec'      / 'medik-llvm-kompiled'
krelease_dir    = medik_dir    / 'ext'          / 'k'              / 'k-distribution'      / 'target' / 'release' / 'k'
kbin_dir        = krelease_dir / 'bin'

def set_env():
    if os.getenv('LOGINFO'):
        logging.basicConfig(level=logging.INFO)
    if os.getenv('LOGDEBUG'):
        logging.basicConfig(level=logging.DEBUG)

    path_entires = [ kbin_dir ]
    os.environ['PATH'] = str(kbin_dir.resolve()) \
                                + os.pathsep + os.environ['PATH']

