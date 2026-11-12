(function() {
    // 1. Suntik CSS secara automatik ke dalam halaman
    const style = document.createElement('style');
    style.innerHTML = `
        #biocell-landscape-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(4, 9, 20, 0.96);
            backdrop-filter: blur(12px);
            z-index: 999999;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 25px;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .biocell-prompt-card {
            background: rgba(15, 23, 42, 0.9);
            border: 2px solid #00f2fe;
            border-radius: 24px;
            padding: 35px 25px;
            max-width: 360px;
            box-shadow: 0 0 35px rgba(0, 242, 254, 0.35);
            color: #ffffff;
        }

        .biocell-phone-anim {
            font-size: 54px;
            margin-bottom: 15px;
            display: inline-block;
            animation: rotateDevice 2.2s infinite ease-in-out;
        }

        @keyframes rotateDevice {
            0% { transform: rotate(0deg); }
            45% { transform: rotate(-90deg); }
            55% { transform: rotate(-90deg); }
            100% { transform: rotate(0deg); }
        }

        .biocell-prompt-card h2 {
            color: #00f2fe;
            font-size: 21px;
            margin: 0 0 12px 0;
            font-weight: 800;
        }

        .biocell-prompt-card p {
            color: #cbd5e1;
            font-size: 14.5px;
            line-height: 1.6;
            margin: 0 0 22px 0;
        }

        .biocell-dismiss-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: #94a3b8;
            padding: 9px 20px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            cursor: pointer;
            transition: 0.3s;
        }

        .biocell-dismiss-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            color: #ffffff;
        }

        /* Aktif HANYA pada telefon bimbit (lebar <= 768px) dalam mod menegak (portrait) */
        @media screen and (max-width: 768px) and (orientation: portrait) {
            #biocell-landscape-overlay:not(.dismissed) {
                display: flex;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Cipta elemen HTML kotak gesaan secara automatik
    window.addEventListener('DOMContentLoaded', () => {
        const overlay = document.createElement('div');
        overlay.id = 'biocell-landscape-overlay';

        // Semak jika pengguna sudah menutup amaran dalam sesi pelayar ini
        if (sessionStorage.getItem('biocell_landscape_dismissed') === 'true') {
            overlay.classList.add('dismissed');
        }

        overlay.innerHTML = `
            <div class="biocell-prompt-card">
                <div class="biocell-phone-anim">📱</div>
                <h2>Sila Pusingkan Telefon Anda<br><small style="font-size: 14px; color: #94a3b8; font-weight: 600;">Please Rotate Your Device</small></h2>
                <p>
                    Untuk paparan model 3D, AR, dan permainan kuiz <strong>BioCell-AR</strong> yang terbaik, sila gunakan mod melintang (<strong>Horizontal / Landscape</strong>).
                </p>
                <button type="button" class="biocell-dismiss-btn" id="btn-dismiss-landscape">
                    Teruskan Secara Menegak / Continue Anyway
                </button>
            </div>
        `;

        document.body.appendChild(overlay);

        // Fungsi untuk butang abaikan (pilihan fleksibel untuk murid)
        document.getElementById('btn-dismiss-landscape').addEventListener('click', () => {
            overlay.classList.add('dismissed');
            sessionStorage.setItem('biocell_landscape_dismissed', 'true');
        });
    });
})();